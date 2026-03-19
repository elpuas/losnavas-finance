Design a modern, mobile-first family finance app focused on managing money by pay periods (biweekly). This is a private household tool for a small family, not a commercial product.

The app should help track income, expenses, and balance across two different biweekly cycles:

- First period: School-related expenses
- Second period: Home-related expenses

The output should be a clean React UI with reusable components and mock data. No backend required.

Core concept:
The family manages finances per quincena (biweekly period), not monthly. Each period has its own income, expenses, and balance.

Key requirement:
Support TWO separate financial views:
1. School Period (Quincena 1)
2. Home Period (Quincena 2)

Users:
- Alfredo
- Cata

Design direction:
- Mobile-first (feels like a native app)
- Clean, modern, simple
- Friendly and practical, not corporate
- Rounded cards, soft shadows
- Easy to scan quickly
- Focus on clarity over complexity

Color system:
- Green: active / paid / income
- Red: negative / inactive / removed
- Yellow/Orange: extra or unexpected expenses
- Blue: balance / totals
- Light neutral background

Navigation:
Bottom navigation with:
- Dashboard
- Periods
- Add
- Summary

Main features:

1. Dashboard screen:
- Global balance (combined from both periods)
- Cards:
	- Total Income
	- Total Expenses
	- Remaining Balance
- Donut chart showing:
	- Income vs Expenses vs Balance
- Quick switch or toggle between:
	- School Period
	- Home Period

2. Periods screen (very important):
- Two main sections or tabs:
	- School Period (Quincena 1)
	- Home Period (Quincena 2)

Inside each period:
- Income list
- Expense list
- Total for that period
- Balance for that period

Expenses must be visually grouped into:
- Fixed expenses (recurring)
- Extra expenses (unexpected)

Examples of extra expenses:
- Medical visits (e.g. urologist)
- Travel (e.g. plane tickets)
- One-time purchases

Extra expenses should:
- Be visually highlighted (yellow or orange)
- Be clearly separated from fixed monthly expenses

3. Expense item design:
Each expense item should include:
- Icon
- Name
- Amount
- User (Alfredo / Cata)
- Active toggle (include/exclude from calculation)
- Tag:
	- Fixed
	- Extra

4. Add Expense screen:
- Name
- Amount
- Category
- User (Alfredo / Cata)
- Period selector:
	- School Period
	- Home Period
- Toggle:
	- Is this a fixed expense?
	- Or mark as “Extra expense”
- Date
- Optional notes

5. Income:
- Income per period
- Example:
	- Salary
	- Additional income (e.g. Voyager)
- Each income belongs to a period

6. Summary screen:
- Combined overview of both periods
- Show:
	- Total income
	- Total expenses
	- Balance
	- Expenses split by:
		- Period
		- User
		- Fixed vs Extra

Important UX details:
- Avoid spreadsheet-style tables
- Use card-based layout
- Use icons for categories (food, health, home, etc.)
- Make toggles clearly affect totals in real time
- Show totals clearly at the bottom of each section
- Highlight balance in a strong visual way

Technical output:
- Generate React functional components
- Use hooks (useState)
- Keep structure modular and simple
- Include mock data reflecting:
	- Two periods
	- Fixed expenses
	- Extra expenses

Goal:
The app should make it very easy for a family to understand:
- How much money they have per quincena
- What expenses are fixed vs unexpected
- Where their money is going