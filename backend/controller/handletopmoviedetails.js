let axios = require('axios');
async function handletopmoviedetails(req, res) {
    try {
        let {id} = req.body;
        let response = await  axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=YOUR_API_KEY&page=${page}`);
        return res.status(200).json(response.data);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = handletopmoviedetails;