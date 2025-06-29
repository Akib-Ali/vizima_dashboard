import { Button } from "@/components/ui/button"
import {
    Download,
    FolderSyncIcon as Sync,

} from "lucide-react"
import AddPropertyModal from "../AddPropertyModal/propertyModal"
import { PropertyFormData } from "../Schema/property-schema"
// type HeaderProps = {
//     open: boolean;
//     setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// };


type HeaderProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    onSubmit: (data: PropertyFormData, onSuccess: () => void) => void
}

const Header = ({ open, setOpen, onSubmit }: HeaderProps) => {

    return (
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold">Property Management</h2>
                <p className="text-muted-foreground">Manage your PG and Hostel listings</p>
            </div>
            <div className="flex space-x-2">
                <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                </Button>
                <AddPropertyModal open={open} setOpen={setOpen} onSubmit={onSubmit} />
            </div>
        </div>
    )


}


export default Header