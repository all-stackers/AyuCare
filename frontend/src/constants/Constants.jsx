  export const DatePickerOptions = {
	// title: "App Name",
	autoHide: true,
	todayBtn: false,
	clearBtn: false,
	maxDate: new Date("2030-01-01"),
	minDate: new Date("1950-01-01"),
	theme: {
		background: "",
		todayBtn: "bg-purple-dark",
		clearBtn: "",
		icons: "",
		text: "",
		// disabledText: "bg-red-500",
		input: "",
		inputIcon: "",
		selected: "bg-purple-dark",
	},
	icons: {
		// () => ReactElement | JSX.Element
		prev: () => <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
        </span>,
		next: () => <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
        </span>,
	},
	datepickerClassNames: "top-12",
	defaultDate: new Date(),
	language: "en",
}