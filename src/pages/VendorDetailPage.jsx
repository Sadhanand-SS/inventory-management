import { useParams } from "react-router-dom";
import VendorSummary from "../components/vendor/VendorSummary";

const VendorDetailPage = () => {
  const { vendorId } = useParams();
  return (
    <>
      <VendorSummary vendorId={vendorId}/>
    </>
  );
};

export default VendorDetailPage;
