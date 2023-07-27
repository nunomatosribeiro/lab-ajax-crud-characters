class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
  }

  getFullList = async () => {
    const fullList = await axios.get(`${this.BASE_URL}/characters`);
    console.log(fullList);
    return fullList;
  };

  getOneRegister = async (characterId) => {
    return await axios.get(`${this.BASE_URL}/characters/${characterId}`);
  };

  createOneRegister = async (characterInfo) => {
    return await axios.post(`${this.BASE_URL}/characters/`, characterInfo);
  };

  updateOneRegister = async (characterId, characterInfo) => {
    return await axios.put(
      `${this.BASE_URL}/characters/${characterId}`,
      characterInfo
    );
  };

  deleteOneRegister = async (characterId) => {
    return await axios.delete(`${this.BASE_URL}/characters/${characterId}`);
  };
}
