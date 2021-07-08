import * as React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

export default function TransitionsModal({ style, imgOpen, imgClose, img }) {

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={style.modal}
        open={imgOpen}
        onClose={imgClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={imgOpen}>
          <div>
            <img
              id="transition-modal-description"
              src={img}
              alt="Apologies, not found"
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
