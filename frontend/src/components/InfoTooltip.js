import unionComplete from '../images/unionComplete.png';
import unionReject from '../images/unionReject.png';

function InfoTooltip({isOpen, onClose, status}) {

  return (
    <div className={`info-tool-tip  ${isOpen && 'info-tool-tip_opened'}`}>
      <div className="info-tool-tip__container">
        <img className="info-tool-tip__image" src={status ? unionComplete : unionReject} alt="Union" />
        <p className="info-tool-tip__text">{status ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
        <button className="info-tool-tip__close" type="button" aria-label="Закрыть попап"  onClick={onClose}></button>
      </div>
    </div>
  );
}

export default InfoTooltip; 