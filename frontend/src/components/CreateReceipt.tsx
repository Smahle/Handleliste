import { Button, Modal, Paper } from "@mui/material";
//TODO IMPLEMENT RECIEPS
export default function CreateReceipt({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2 id="modal-modal-title">Receipt</h2>
        <p id="Recipe 1.">
          1. Peel the potatoes and carrots and boil them for 30mins.
        </p>
        <p id="Recipe 2.">2. Cut the fish in medium chunks and fry them.</p>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </Paper>
    </Modal>
  );
}
