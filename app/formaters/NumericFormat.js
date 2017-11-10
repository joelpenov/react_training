
const SeparateByCommas = (number) => {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

const NumericFormat = {
	SeparateByCommas: SeparateByCommas
}

export default NumericFormat;