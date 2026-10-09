# Business Problem Analysis Report — Campus Equipment Checkout System

> **Teaching demo only.** This case and all records are synthetic, generated for classroom practice. Metrics below describe the generated dataset, not a real university or observed operational performance.

## Executive summary
This report demonstrates how a database/web project can be justified from an operational problem. The fictional campus equipment team needs to track equipment, borrowers, due dates, return status, and recorded return condition. A centralized application is proposed so staff can search inventory and review checkout status from one interface.

## 1. Business context
Teaching spaces may lend laptops, projectors, microphones, networking kits, and other equipment. The workflow requires a reliable link between each asset, borrower, checkout date, due date, and return information. When records are scattered across sheets or chat messages, staff may have difficulty determining which item is currently held, which return is late, and whether a returned item needs inspection.

## 2. Problem statement
The fictional process lacks a single operational view of inventory and checkout activity. This can create four risks to investigate: (1) delayed identification of overdue items, (2) time-consuming lookup of transaction history, (3) inconsistent borrower/asset details when information is duplicated, and (4) limited visibility into equipment condition after return.

These are **scenario assumptions**, not claims that a real campus has experienced these problems. A real project should validate them through interviews, observation, and actual baseline data.

## 3. Dataset and method
- File: `data/synthetic_checkouts.csv`
- Rows: 180 synthetic checkout transactions
- Coverage: 1 January 2026–8 October 2026; metrics evaluated as of 9 October 2026
- Equipment assets represented: 20; fictional borrowers: 15
- Data fields: transaction code, borrower and department, asset and category, checkout/due/return dates, checkout/return condition, status
- Method: descriptive counts and ratios over the synthetic rows; this is a demonstration, not inferential statistics.

## 4. Baseline metrics from synthetic data
| Metric | Result | Interpretation |
|---|---:|---|
| Total transactions | 180 | Dataset size for demo |
| Returned transactions | 143 | Transactions with a recorded return date |
| Active, not yet due | 5 | Open transactions whose due date has not passed |
| Overdue, not returned | 32 | Open transactions whose due date is before 9 Oct 2026 |
| Late return rate | 38.5% (55/143) | Share of returned transactions returned after the due date |
| Returned items with condition issue | 9.1% (13/143) | Return condition recorded as Minor Damage or Needs Inspection |

**Important interpretation:** These figures demonstrate the kinds of evidence a report can present. Because the dataset is synthetic and generated for a teaching demo, they must not be described as real-world findings. Some conditions and transaction patterns are intentionally sampled to support dashboard and SQL exercises.

## 5. Category distribution
| Category | Transactions |
|---|---:|
| Accessories | 43 |
| Audio Visual | 29 |
| Computing | 34 |
| Networking | 44 |
| Photography | 30 |

## 6. Root-cause hypotheses to validate
1. Transaction data is maintained in multiple places rather than a canonical system.
2. Status is calculated manually instead of derived from due and return dates.
3. Equipment details and category names are repeated in transaction records.
4. Return-condition follow-up is not consistently surfaced to the equipment coordinator.

These are hypotheses. In a real investigation, verify each one with process walkthroughs and stakeholder interviews before presenting it as a confirmed root cause.

## 7. Proposed requirements mapped to the problem
| Evidence/problem to address | Requirement | Web feature | Database support |
|---|---|---|---|
| Staff need a current view of checkout activity | Display status counts | Dashboard cards | Query `checkouts` by status/date |
| Overdue items need follow-up | Identify open transactions past due | Overdue filter/table | `due_date`, `returned_date` and status logic |
| Inventory details need to be searchable | Search and filter assets | Equipment catalogue | `equipment`, `equipment_categories` |
| Borrower/asset histories must be traceable | Show linked transaction history | Checkout history | Foreign keys to `borrowers` and `equipment` |
| Return issues need attention | Surface condition issues | Return-condition indicator | `return_condition` field |

## 8. Why a web application?
A web interface is justified in this scenario because equipment coordinators and teaching staff need a shared, searchable view rather than separate copies of a spreadsheet. A web application can combine data entry, validation, status filters, and dashboard summaries while PostgreSQL maintains relationships and constraints. A web app alone does not guarantee better operations: access control, data quality, training, and a clear checkout procedure are also needed.

## 9. Success criteria for the prototype
- Users can search equipment and inspect its category.
- Users can review checkout history and filter active/overdue records.
- Every checkout references one existing borrower and one existing asset.
- Dashboard totals agree with SQL queries over the same dataset.
- Test cases cover returned, active, overdue, and condition-issue scenarios.
- In a real deployment, baseline lookup time and overdue rate would be measured before and after rollout; do not claim improvement without that evaluation.

## 10. Limitations and academic integrity
- Synthetic dataset only; no real operational data or stakeholder interviews were used.
- Current prototype is not production-ready and does not enforce every business rule.
- The report is a worked instructor example. Students should independently select a case, produce or collect their own data, justify functional dependencies, and explain their own design decisions.

## Suggested next step
Use the analysis dashboard in `web/analysis.html` to explore the synthetic metrics. Then trace one reported problem through the requirements, ERD, SQL implementation, web feature, and test case.
