import UpdateFgRack from "../../Components/pricing/updateFg/UpdateFgRack";
import EssoGroupForm from "../../Components/pricing/essoGroup/EssoGroupForm";
import UploadEssoGroupRackForm from "../../Components/pricing/essoGroup/UploadEssoGroupRackForm";
import PricingCommon from "../../Components/pricing/PricingCommon";
export const UltramarGroupTab = [
  {
    id: "1",
    label: "Update ULTRAMAR  Group Rack Cent",
    component: (
      <UpdateFgRack
        title=" ULTRAMAR  Group Rack Entry"
        btnTitle="Search Group"
      />
    ),
        //  component: <PricingCommon  title="ULTRAMAR  Group Rack Entry" btnTitle="Search Group" apiname={""}/>

  },
  {
    id: "2",
    label: "Upload ULTRAMAR  Group Rack Cent ",
    component: (
      <UploadEssoGroupRackForm
        title=" ULTRAMAR  Group Rack Entry"
        btnTitle="Search Group"
      />
    ),
            //  component: <PricingCommon csvFile={true} title="ULTRAMAR  Group Rack Entry" btnTitle="Search Group" apiname={""}/>

  },
  {
    id: "3",
    label: "ULTRAMAR  Group Rack Cent List  ",
    component: (
      <EssoGroupForm
        tabletitle="ULTRAMAR Group Rack Cent List "
        title=" ULTRAMAR  Group Rack Entry"
        btnTitle="Search Group"
      />
    ),
  },
];
