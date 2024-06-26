import PropTypes from "prop-types";

export const fetchDataDetails = async (term, setLoading, setError, setData) => {
  setLoading(true);
  setError("");
  try {
    const url = `https://api.fda.gov/drug/drugsfda.json?search=openfda.brand_name:"${term}"`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.results && responseJson.results.length > 0) {
      setData(responseJson.results[0]);
    } else {
      setData(null);
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    setError(error.message || "Something went wrong while fetching data");
  } finally {
    setLoading(false);
  }
};

export const fetchDataCard = async (setLoading, setError, setData) => {
  setLoading(true);
  setError("");
  try {
    const url = "https://api.fda.gov/drug/drugsfda.json?count=openfda.brand_name.exact";
    const response = await fetch(url);
    const responseJson = await response.json();
    setData(responseJson.results);
  } catch (error) {
    console.error("Error fetching data: ", error);
    setError(error.message || "Something went wrong while fetching data");
  } finally {
    setLoading(false);
  }
};

fetchDataDetails.propTypes = {
  term: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
};

fetchDataCard.propTypes = {
  setLoading: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
};
