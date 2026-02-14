import UpdateUltramar from "../../Components/pricing/ultramarGroup/UpdateUltramar";
import UlRackList from "../../Components/pricing/ultramarGroup/UlRackList";
import UploadUlGroup from "../../Components/pricing/ultramarGroup/UploadUlGroup";
export const UltramarGroupTab = [
  {
    id: "1",
    label: "Update ULTRAMAR  Group Rack Cent",
    component: (
      <UpdateUltramar
        title=" ULTRAMAR  Group Rack Entry"
        btnTitle="Search Group"
      />
    ),

  },
  {
    id: "2",
    label: "Upload ULTRAMAR  Group Rack Cent ",
    component: (
      <UploadUlGroup
        title=" ULTRAMAR  Group Rack Entry"
        btnTitle="Upload Rack Pricing"
      />
    ),

  },
  {
    id: "3",
    label: "ULTRAMAR  Group Rack Cent List  ",
    component: (
      <UlRackList
        tabletitle="ULTRAMAR Group Rack Cent List "
        title=" ULTRAMAR  Group Rack Entry"
        btnTitle="Search Group"
      />
    ),
  },
];
