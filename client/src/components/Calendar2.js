import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar2.css";

export default function Calendar2(props) {
  const ExampleCustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
    <input
      value={value}
      className="example-custom-input"
      onClick={onClick}
      onChange={onChange}
      ref={ref}
    ></input>
  ));
  return (
    <DatePicker
      selected={props.selected}
      onChange={props.onChange}
      customInput={<ExampleCustomInput />}
      dayClassName={() => "example-datepicker-day-class"}
      popperClassName="example-datepicker-class"
      todayButton="TODAY"
    />
  );
}
