import left from "../img/left.png";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  step: number;
}

const BackButton = (props: BackButtonProps) => {
  const navigate = useNavigate();
  const goBack = () => navigate(props.step,);

  return (
    <button className='buttonLeft'onClick={goBack}>
      <img src={left} alt='left'></img>
    </button>
  );
};

export default BackButton;