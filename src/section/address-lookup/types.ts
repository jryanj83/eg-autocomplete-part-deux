import { UserData } from "@/app/types";


export interface AddressLookupDrawerProps {
  selectedUser: UserData | null;
  onClose: () => void;
}