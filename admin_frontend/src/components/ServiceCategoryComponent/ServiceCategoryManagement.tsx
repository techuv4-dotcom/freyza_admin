// import { useState } from "react";
// import ExistingServiceCategories from "./ExistingServiceCategories";
// import ServiceCategoryForm from "./CreateServiceCategoryForm";
// import EditServiceCategoryForm from "./UpdateServiceCategoryForm";
// // import EditServiceCategoryForm from "./EditServiceCategoryForm";

// const ServiceCategoryManagement = () => {
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
//   const [showEditForm, setShowEditForm] = useState(false);

//   if (showAddForm) {
//     return <ServiceCategoryForm onBack={() => setShowAddForm(false)} />;
//   }

//   if (showEditForm) {
//     return <EditServiceCategoryForm

//     onBack={() => setShowEditForm(false)} />;
//   }

//   return (
//     <ExistingServiceCategories
//       onAdd={() => {
//         setShowAddForm(true);
//       }}
//       onEdit={() => {
//         setShowEditForm(true);
//       }}
//     />
//   );
// };

// export default ServiceCategoryManagement;

import { useState } from "react";
import ExistingServiceCategories from "./ExistingServiceCategories";
import ServiceCategoryForm from "./CreateServiceCategoryForm";
import EditServiceCategoryForm from "./UpdateServiceCategoryForm";

const ServiceCategoryManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  if (showAddForm) {
    return <ServiceCategoryForm onBack={() => setShowAddForm(false)} />;
  }

  if (showEditForm && selectedCategoryId !== null) {
    return (
      <EditServiceCategoryForm
        categoryId={selectedCategoryId}
        onBack={() => setShowEditForm(false)}
      />
    );
  }

  return (
    <ExistingServiceCategories
      onAdd={() => setShowAddForm(true)}
      onEdit={(id) => {
        setSelectedCategoryId(id);
        setShowEditForm(true);
      }}
    />
  );
};

export default ServiceCategoryManagement;
