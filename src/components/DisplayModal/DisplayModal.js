import style from "./DisplayModal.module.css";
function DisplayModal(props) {
   
  return (
    <div className={props.property.isVisible?`${style.modal} ${style.modaldisplay}`:`${style.modal}`}>
      <div className={`${style.modal_content}`}>
        <span className={`${style.close}`} onClick={props.onClick}>&times;</span>
        <p>{props.property.msg}</p>
      </div>
    </div>
  );
}
export default DisplayModal;
