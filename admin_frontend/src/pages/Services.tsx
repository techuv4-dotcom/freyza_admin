import { useState } from "react";
import ShowServices from "../components/services/ShowServices";
import AddService from "../components/services/AddServices";
import UpdateServices from "../components/services/updateServices";

const ServiceManagement = () => {
  const [showAddService, setShowAddService] = useState(false);
  const [service, setService] = useState<number>(0);
  const [editService, setEditService] = useState<boolean>(false);

  if (editService) {
    return (
      <>
        {<UpdateServices service={service} setEditServices={setEditService} />}
      </>
    );
  }

  return (
    <>
      {showAddService ? (
        <AddService
          // service={service}
          onBack={() => {
            setShowAddService(false);
          }}
        />
      ) : (
        <ShowServices
          setService={setService}
          setEditServices={setEditService}
          onAddService={() => setShowAddService(true)}
        />
      )}
    </>
  );
};

export default ServiceManagement;
