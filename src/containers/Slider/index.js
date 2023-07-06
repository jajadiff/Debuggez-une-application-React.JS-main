import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

function SliderCard({ event, index, idx }) {
  SliderCard.propTypes = {
    event: PropTypes.shape({
      title: PropTypes.string.isRequired,
      cover: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    idx: PropTypes.number.isRequired,
  };

  const { title, description, cover, date } = event;

  return (
    <div
      key={title}
      className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
    >
      <img src={cover} alt={title} />
      <div className="SlideCard__descriptionContainer">
        <div className="SlideCard__description">
          <h3>{title}</h3>
          <p>{description}</p>
          <div>{getMonth(new Date(date))}</div>
        </div>
      </div>
    </div>
  );
}

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? +1 : 1
  );

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, [index, byDateDesc]);
  // console.log(index);
  // console.log("====");
  // console.log(data);
  // console.log("++++");
  // console.log(byDateDesc);
  // console.log("++++");
  // console.log(byDateDesc.length);
  // console.log("++++");

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <SliderCard key={event.title} event={event} index={index} idx={idx} />
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((radioEvent, radioIdx) => (
            <input
              key={`dot-${radioEvent.title}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
