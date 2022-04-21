'use strict';

const axios = require('axios');

class Converter {

	static async convertCurrency(from, to) {
		const convertion = from.toUpperCase() + '_' + to.toUpperCase();
		const converterApiKey = process.env.CURRENCY_CONVERTER_API_KEY;
		// TODO handle no api key error or a worng one
		const { data } = await axios.get(`https://free.currconv.com/api/v7/convert?q=${convertion}&compact=ultra&apiKey=${converterApiKey}`);
		return data[convertion];
	}
}

module.exports = Converter;
