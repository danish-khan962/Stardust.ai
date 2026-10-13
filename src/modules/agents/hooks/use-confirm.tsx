import { FC, JSX, useState } from "react"
import { Button } from "@/components/ui/button"

import ResponsiveDialog from "@/components/reponsive-dialog"

export const useConfirm = (
    title: string,
    description: string,
): [() => JSX.Element, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<{
        resolve: (value: boolean) => void;
    } | null>(null);

    const confirm = () => {
        return new Promise((resolve) => {
            setPromise({ resolve })
        })
    }

    const handleClose = () => {
        setPromise(null)
    }

    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose();
    }

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose();
    }

    const ConfirmationDialog = () => (
        <ResponsiveDialog
            open={promise !== null}
            onOpenChange={handleClose}
            title={title}
            description={description}
        >
            <div className="w-full flex flex-col-reverse md:flex-row justify-end items-center gap-x-3">
                <Button
                    onClick={handleClose}
                    variant={"outline"}
                    className="w-full md:w-auto cursor-pointer px-5 py-6"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    className="w-full md:w-auto from-red-700 via-red-800 to-red-900 text-white px-5"
                >
                    Confirm
                </Button>
            </div>
        </ResponsiveDialog>
    )

    return [ConfirmationDialog, confirm];
}