import { FilePlus } from "lucide-react"
import { DetailsForm } from "../details-form"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

export const CreateFormDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button
        variant="outline"
        className="group flex h-full min-h-48 flex-col items-center justify-center gap-4 border-2 border-dashed border-primary/20 bg-background hover:border-primary/70 hover:bg-muted/50"
      >
        <FilePlus className="mr-2 h-8 w-8 text-muted-foreground group-hover:text-primary/70" />
        <p className="text-lg text-muted-foreground group-hover:text-primary/70">
          Create Form
        </p>
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Form</DialogTitle>
        <DialogDescription>
          Create a new form to start collecting responses.
        </DialogDescription>
      </DialogHeader>
      <DetailsForm />
    </DialogContent>
  </Dialog>
)
