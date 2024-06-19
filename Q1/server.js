const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;
const THIRD_PARTY_BASE_URL = "http://20.244.56.144/test";

// Example authorization token or credentials
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE4Nzc1Mjg1LCJpYXQiOjE3MTg3NzQ5ODUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6Ijc3Yjk1OTlkLTQ5ZDMtNGY3ZS05YzI1LTI2ZWJiYmUxZmVjNyIsInN1YiI6IjIxMDMwMzEwODM0NUBwYXJ1bHVuaXZlcnNpdHkuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJhYnNHbyIsImNsaWVudElEIjoiNzdiOTU5OWQtNDlkMy00ZjdlLTljMjUtMjZlYmJiZTFmZWM3IiwiY2xpZW50U2VjcmV0Ijoibk5HVEJHUEl3S3FDVU5UaCIsIm93bmVyTmFtZSI6IkFiaGF5IFJhbmEiLCJvd25lckVtYWlsIjoiMjEwMzAzMTA4MzQ1QHBhcnVsdW5pdmVyc2l0eS5hYy5pbiIsInJvbGxObyI6IjIxMDMwMzEwODM0NSJ9.FAH5dpUg_icZ5hKnv6mGRYQ6XROIf8ryeZkNb1N61RA';

app.use(cors());
app.use(express.json());

app.get('/numbers/:numberId', async (req, res) => {
  const { numberId } = req.params;
  if (!['p', 'f', 'e', 'r'].includes(numberId)) {
    return res.status(400).json({ error: "Invalid number ID" });
  }

  try {
    const config = {
      headers: {
        'Authorization': AUTH_TOKEN
      }
    };

    const response = await axios.get(`${THIRD_PARTY_BASE_URL}/${numberId}`, config);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from third-party server:', error);
    res.status(500).json({ error: 'Failed to fetch data from third-party server' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
