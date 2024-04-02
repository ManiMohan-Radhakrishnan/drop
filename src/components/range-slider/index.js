import "toolcool-range-slider/dist/plugins/tcrs-marks.min.js";
import "toolcool-range-slider";
import { useEffect, useRef } from "react";

const RangeSlider = ({
  className,
  markCount,
  markValuesCount,
  minValue,
  maxValue,
  round,
  onChange = () => {},
  name,
  marks = false,
  width,
  labels = false,
  mouseWheel = false,
  data,
  markValue,
}) => {
  const slideRef = useRef();
  useEffect(() => {
    slideRef?.current?.addEventListener("change", onChange);
    return () => slideRef?.current?.removeEventListener("change", onChange);
  }, []);

  return (
    <tc-range-slider
      data={data}
      class={className}
      ref={slideRef}
      name={name}
      marks={marks}
      marks-count={markCount}
      marks-values-count={markValuesCount}
      min={minValue}
      max={maxValue}
      round={round}
      slider-width={width}
      generate-labels={labels}
      mousewheel-disabled={mouseWheel}
      marks-step={markValue}
    ></tc-range-slider>
  );
};

export default RangeSlider;
