"use client";

import { useState } from "react";
import { DollarSign, Plus, Trash2, ArrowRight, Check, X, ShieldAlert, CreditCard, Sparkles } from "lucide-react";

export interface ExpenseItem {
  id: string;
  description: string;
  amount: number;
  paidByUserId: string;
  paidByUsername: string;
  splitAmongUserIds: string[];
  category: "stay" | "food" | "transport" | "activity" | "permit" | "misc";
  createdAt: string;
}

interface Member {
  id: string;
  username: string;
  email?: string;
}

interface GroupExpenseSplitterProps {
  groupId: string;
  members: Member[];
  initialExpenses?: ExpenseItem[];
  currentUserId?: string;
  currentUsername?: string;
  onUpdate?: (expenses: ExpenseItem[]) => void;
}

const CATEGORIES = [
  { value: "stay", label: "🏨 Stay / Homestay" },
  { value: "food", label: "🍽️ Food & Dhabas" },
  { value: "transport", label: "🚗 Fuel & Tolls" },
  { value: "permit", label: "📄 Permits & Entry" },
  { value: "activity", label: "🎟️ Trek / Guides" },
  { value: "misc", label: "🧳 Miscellaneous" },
];

export default function GroupExpenseSplitter({
  groupId,
  members,
  initialExpenses = [],
  currentUserId = "",
  currentUsername = "",
  onUpdate,
}: GroupExpenseSplitterProps) {
  const [expenses, setExpenses] = useState<ExpenseItem[]>(initialExpenses);
  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);

  // Modal form state
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [payerId, setPayerId] = useState(currentUserId);
  const [category, setCategory] = useState<ExpenseItem["category"]>("food");
  const [splitAmong, setSplitAmong] = useState<string[]>(members.map((m) => m.id));

  const saveExpenses = async (updated: ExpenseItem[]) => {
    setExpenses(updated);
    setSaving(true);
    try {
      await fetch(`/api/group-trips/${groupId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ expenses: updated }),
      });
      if (onUpdate) onUpdate(updated);
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!desc.trim() || isNaN(numAmount) || numAmount <= 0 || splitAmong.length === 0) return;

    const payer = members.find((m) => m.id === payerId) || { id: currentUserId, username: currentUsername };

    const newExpense: ExpenseItem = {
      id: `exp-${Date.now()}`,
      description: desc.trim(),
      amount: numAmount,
      paidByUserId: payer.id,
      paidByUsername: payer.username,
      splitAmongUserIds: splitAmong,
      category,
      createdAt: new Date().toISOString(),
    };

    const updated = [newExpense, ...expenses];
    await saveExpenses(updated);

    // Reset
    setShowAddModal(false);
    setDesc("");
    setAmount("");
    setSplitAmong(members.map((m) => m.id));
  };

  const handleDeleteExpense = async (id: string) => {
    const updated = expenses.filter((e) => e.id !== id);
    await saveExpenses(updated);
  };

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Compute Net Balances: Member ID -> net amount (positive: is owed, negative: owes)
  const balances: Record<string, number> = {};
  members.forEach((m) => {
    balances[m.id] = 0;
  });

  expenses.forEach((exp) => {
    const splitCount = exp.splitAmongUserIds.length;
    if (splitCount === 0) return;
    const perPerson = exp.amount / splitCount;

    // Payer is credited the full amount
    balances[exp.paidByUserId] = (balances[exp.paidByUserId] || 0) + exp.amount;

    // Each participant is debited their share
    exp.splitAmongUserIds.forEach((uid) => {
      balances[uid] = (balances[uid] || 0) - perPerson;
    });
  });

  // Calculate settlement transactions: Debtors pay Creditors
  const debtors: { id: string; name: string; amount: number }[] = [];
  const creditors: { id: string; name: string; amount: number }[] = [];

  members.forEach((m) => {
    const bal = balances[m.id] || 0;
    if (bal < -1) {
      debtors.push({ id: m.id, name: m.username, amount: -bal });
    } else if (bal > 1) {
      creditors.push({ id: m.id, name: m.username, amount: bal });
    }
  });

  interface Settlement {
    fromId: string;
    fromName: string;
    toId: string;
    toName: string;
    amount: number;
  }

  const settlements: Settlement[] = [];
  let dIdx = 0;
  let cIdx = 0;

  const dList = debtors.map((d) => ({ ...d }));
  const cList = creditors.map((c) => ({ ...c }));

  while (dIdx < dList.length && cIdx < cList.length) {
    const debtor = dList[dIdx];
    const creditor = cList[cIdx];
    const settleAmount = Math.min(debtor.amount, creditor.amount);

    if (settleAmount > 0.5) {
      settlements.push({
        fromId: debtor.id,
        fromName: debtor.name,
        toId: creditor.id,
        toName: creditor.name,
        amount: Math.round(settleAmount),
      });
    }

    debtor.amount -= settleAmount;
    creditor.amount -= settleAmount;

    if (debtor.amount < 0.5) dIdx++;
    if (creditor.amount < 0.5) cIdx++;
  }

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        padding: "1.75rem",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.5rem",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "1rem",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <DollarSign size={18} color="var(--accent-gold)" />
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-serif)", margin: 0 }}>
              Group Expense Splitter (Splitwise-Lite)
            </h3>
          </div>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: "0.2rem 0 0" }}>
            Log shared costs on the road and generate instant UPI settlement links
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "0.55rem 1rem",
            borderRadius: "var(--radius-sm)",
            border: "none",
            background: "var(--accent-gold)",
            color: "var(--bg-primary)",
            fontSize: "0.82rem",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          <Plus size={14} /> Add Expense
        </button>
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "1.75rem",
        }}
      >
        <div style={{ background: "var(--bg-secondary)", padding: "1rem 1.25rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
          <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", fontWeight: 700, marginBottom: "0.25rem" }}>
            Total Group Spent
          </div>
          <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--accent-gold)", fontFamily: "var(--font-serif)" }}>
            ₹{Math.round(totalSpent).toLocaleString("en-IN")}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
            {expenses.length} shared expense{expenses.length !== 1 ? "s" : ""} logged
          </div>
        </div>

        <div style={{ background: "var(--bg-secondary)", padding: "1rem 1.25rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
          <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", fontWeight: 700, marginBottom: "0.25rem" }}>
            Your Net Balance
          </div>
          {(() => {
            const myBal = balances[currentUserId] || 0;
            const isOwed = myBal > 1;
            const owes = myBal < -1;
            const balColor = isOwed ? "#10b981" : owes ? "#ef4444" : "var(--text-primary)";
            return (
              <>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: balColor, fontFamily: "var(--font-serif)" }}>
                  {isOwed ? `+₹${Math.round(myBal).toLocaleString("en-IN")}` : owes ? `-₹${Math.round(Math.abs(myBal)).toLocaleString("en-IN")}` : "Settled Up (₹0)"}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
                  {isOwed ? "You are owed by the group" : owes ? "You owe the group" : "All even"}
                </div>
              </>
            );
          })()}
        </div>
      </div>

      {/* Suggested Settlements Section */}
      {settlements.length > 0 && (
        <div style={{ background: "rgba(212,95,17,0.06)", border: "1px solid var(--border-accent)", borderRadius: "var(--radius-sm)", padding: "1rem 1.25rem", marginBottom: "1.75rem" }}>
          <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent-gold)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>
            ⚡ Smart Settlements Plan
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {settlements.map((s, idx) => {
              const isMeDebtor = s.fromId === currentUserId;
              const upiLink = `upi://pay?pn=${encodeURIComponent(s.toName)}&am=${s.amount}&cu=INR&tn=${encodeURIComponent(`Trip Expense Settlement`)}`;

              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.55rem 0.85rem",
                    borderRadius: "var(--radius-sm)",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    fontSize: "0.85rem",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontWeight: 600, color: isMeDebtor ? "#ef4444" : "var(--text-primary)" }}>
                      {s.fromName}
                    </span>
                    <ArrowRight size={13} color="var(--text-muted)" />
                    <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{s.toName}</span>
                    <span style={{ fontWeight: 700, color: "var(--accent-gold)", marginLeft: "4px" }}>
                      ₹{s.amount.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {isMeDebtor && (
                    <a
                      href={upiLink}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "0.25rem 0.65rem",
                        borderRadius: "100px",
                        background: "#10b981",
                        color: "#fff",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textDecoration: "none",
                      }}
                    >
                      <CreditCard size={12} /> Pay via UPI
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Expenses History List */}
      <div>
        <div style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
          Logged Expenses
        </div>

        {expenses.length === 0 ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)", border: "1px dashed var(--border)", borderRadius: "var(--radius-sm)", fontSize: "0.85rem" }}>
            No expenses logged yet. Tap "Add Expense" to track group costs.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {expenses.map((exp) => {
              const catLabel = CATEGORIES.find((c) => c.value === exp.category)?.label || "🧳 Misc";
              return (
                <div
                  key={exp.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.75rem 1rem",
                    borderRadius: "var(--radius-sm)",
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border)",
                    gap: "0.75rem",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>
                        {exp.description}
                      </span>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{catLabel}</span>
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
                      Paid by <strong>{exp.paidByUsername}</strong> · Split among {exp.splitAmongUserIds.length} members
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>
                      ₹{Math.round(exp.amount).toLocaleString("en-IN")}
                    </span>
                    <button
                      onClick={() => handleDeleteExpense(exp.id)}
                      title="Remove expense"
                      style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: "0.25rem" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Expense Modal */}
      {showAddModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "1.75rem",
              maxWidth: 450,
              width: "100%",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
                Log Shared Expense
              </h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddExpense} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.3rem" }}>
                  Description *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fuel at Kaza Petrol Pump"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.8rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border)",
                    background: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    fontSize: "0.85rem",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.3rem" }}>
                    Amount (₹ INR) *
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    placeholder="e.g. 2400"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.6rem 0.8rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      fontSize: "0.85rem",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.3rem" }}>
                    Paid By
                  </label>
                  <select
                    value={payerId}
                    onChange={(e) => setPayerId(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.6rem 0.8rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      fontSize: "0.85rem",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    {members.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.username} {m.id === currentUserId ? "(You)" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.3rem" }}>
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ExpenseItem["category"])}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.8rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border)",
                    background: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    fontSize: "0.85rem",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.4rem" }}>
                  Split With (Everyone by default)
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {members.map((m) => {
                    const selected = splitAmong.includes(m.id);
                    return (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => {
                          if (selected) {
                            if (splitAmong.length > 1) {
                              setSplitAmong(splitAmong.filter((id) => id !== m.id));
                            }
                          } else {
                            setSplitAmong([...splitAmong, m.id]);
                          }
                        }}
                        style={{
                          padding: "0.3rem 0.65rem",
                          borderRadius: "100px",
                          border: "1px solid",
                          borderColor: selected ? "var(--border-accent)" : "var(--border)",
                          background: selected ? "var(--accent-gold-dim)" : "var(--bg-secondary)",
                          color: selected ? "var(--accent-gold)" : "var(--text-secondary)",
                          fontSize: "0.75rem",
                          fontWeight: selected ? 600 : 400,
                          cursor: "pointer",
                        }}
                      >
                        {selected ? "✓ " : ""}{m.username}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{
                    padding: "0.55rem 1rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border)",
                    background: "transparent",
                    color: "var(--text-secondary)",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    padding: "0.55rem 1.25rem",
                    borderRadius: "var(--radius-sm)",
                    border: "none",
                    background: "var(--accent-gold)",
                    color: "var(--bg-primary)",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {saving ? "Saving…" : "Add Expense"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
