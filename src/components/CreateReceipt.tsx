import { Button, Modal, Paper } from "@mui/material";

export default function CreateReceipt({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
        <h2 id="modal-modal-title">Modal Title</h2>
        <p id="modal-modal-description">Modal content goes here.</p>
        <Button onClick={onClose} variant="outlined">Close</Button>
      </Paper>
    </Modal>
  );
}

