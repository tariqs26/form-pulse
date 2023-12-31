import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { FilePlus } from "lucide-react"
import { CreateForm } from "./forms/create-form"

export function CreateFormButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="group flex h-48 flex-col items-center justify-center gap-4 border-2 border-dashed border-primary/20 bg-background hover:border-primary/70 hover:bg-muted/50"
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
        <CreateForm />
      </DialogContent>
    </Dialog>
  )
}
