### Overview
This project is a real estate website with a public-facing section and a CRM for managing properties and leads. The public section showcases property listings, while the CRM provides tools for real estate agents to manage their workflow. The application has been redesigned with a modern and visually appealing design system and is connected to a Firestore database.

### Implemented Features:

**Design and Styling:**
*   Modern and visually appealing design using Tailwind CSS.
*   A new design system has been implemented with a new color scheme and typography.
*   Reusable UI components have been created in the `components/ui` directory, including `Card`, `Button`, and `Input`.
*   The CRM section now has a dedicated layout with a sidebar for navigation.
*   The application is responsive and works on different screen sizes.

**Public-Facing Pages:**

*   **Home Page (`/`)**
    *   Displays a list of properties that are "For Sale".
    *   Uses a server component to fetch data from Firestore.
    *   Features a modern design with property cards that link to the property details.
*   **Property Details Page (`/[id]`)**
    *   A dynamic route to display the full details of a selected property.
    *   Uses a server component to fetch data from Firestore.
    *   Includes a header with a large image and property title.
    *   Displays property details, price, and status.
*   **Contact Form (`app/[id]/contact-form.tsx`)**
    *   A new component that allows users to send a message to the real estate agent.
    *   The form includes fields for name, email, and a message.
    *   Uses a Server Action (`saveLead`) to securely save the data to Firestore as a new lead.

**CRM (Customer Relationship Management):**

*   **Login Page (`/crm/login`)**
    *   Secure login form for real estate agents using Firebase Authentication (email and password).
    *   The page has been updated with the new design system.
*   **Dashboard (`/crm/dashboard`)**
    *   A protected route that only authenticated users can access.
    *   Displays a welcome message with the user's email.
    *   Shows stats about the properties.
    *   Provides quick links to other pages.
*   **Layout (`/crm/layout.tsx`)**
    *   A new layout for the CRM section with a sidebar for navigation.
*   **Properties Management (`/crm/properties`)**
    *   A protected route that displays a list of properties from Firestore.
    *   Users can add, edit, and delete properties.
*   **Add New Property Page (`/crm/properties/new`)**
    *   A protected route with a form to add a new property.
    *   Uses a Server Action to securely save data to Firestore.
*   **Edit Property Page (`/crm/properties/edit/[id]`)**
    *   A protected route with a form to edit an existing property.
    *   Uses a Server Action to securely update data in Firestore.
*   **Leads Management (`/crm/leads`)**
    *   A protected route that displays a list of leads from Firestore.
    *   Users can add, edit, and delete leads.
*   **Add New Lead Page (`/crm/leads/new`)**
    *   A protected route with a form to add a new lead.
    *   Uses a Server Action to securely save data to Firestore.
*   **Edit Lead Page (`/crm/leads/edit/[id]`)**
    *   A protected route with a form to edit an existing lead.
    *   Uses a Server Action to securely update data in Firestore.

**Firebase Integration:**
*   Firebase SDK has been installed and configured in `lib/firebase.ts`.
*   Firebase Authentication is implemented for the CRM section.
*   Firestore is used as the database for storing and managing properties and leads.
*   The `add`, `list`, `update` and `delete` functionalities for properties are connected to Firestore.
*   The `add`, `list`, `update`, and `delete` functionalities for leads are connected to Firestore.

### Code Quality and Maintenance:
*   Resolved all ESLint errors and warnings to ensure code quality and prevent potential bugs.
*   Updated `app/crm/leads/actions.ts` and `app/crm/properties/actions.ts` to include `console.error` in the `catch` blocks. This ensures that any errors during data mutation are logged, and it also resolves the "unused variable" linting warnings.
