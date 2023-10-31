import React, { useState } from 'react';
import './ImageModal.module.css';

const ImageModal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState(props.imageSrc || '');
  const [modalImageAlt, setModalImageAlt] = useState(props.imageAlt || '');

  const openModal = (src, alt) => {
    setModalImageSrc(src);
    setModalImageAlt(alt);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div>

      <img
        id="myImg"
        src={props.imageSrc}
        alt={props.imageAlt}
        style={{ width: '100%', maxWidth: '300px' }}
        onClick={() => openModal(props.imageSrc, props.imageAlt)}
      />

      {modalVisible && (
        <div id="myModal" className="modal">
          <span className="close" onClick={closeModal}>&times;</span>
          <img className="modal-content" id="img01" src={modalImageSrc} alt={modalImageAlt} />
          <div id="caption">{modalImageAlt}</div>
        </div>
      )}
    </div>
  );
};

export default ImageModal;
