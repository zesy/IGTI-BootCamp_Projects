import { useState, useEffect } from "react";

import ComboBox from "../components/ComboBox";
import DashBody from "../components/DashBody";
import DashHeader from "../components/DashHeader";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { apiGetCities, apiGetElections } from "../services/apiServices";

export default function Main() {
  //USE STATES
  const [allCities, setAllCities] = useState([]);
  const [allLabeledCities, setAllLabeledCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});

  const [elections, setElections] = useState([]);

  //USE EFFECTS======================
  // load cities to pop combobox
  useEffect(() => {
    async function loadAllCities() {
      //All Cities
      const cities = await apiGetCities();
      setAllCities(cities);

      //All Labeled Cities
      const labeledCities = cities.map((item) => {
        return { value: item.id, label: item.name };
      });

      setAllLabeledCities(labeledCities);
    }
    loadAllCities();
  }, []);

  //
  useEffect(() => {
    async function getElection(id) {
      const elections = await apiGetElections(id);
      setElections(elections);
    }
    getElection(selectedCity.id);
  }, [selectedCity]);

  // ========================================
  //HANDLERS
  function handleOnChange(data) {
    const [selected] = allCities.filter((city) => city.id === data.value);
    setSelectedCity((prev) => ({ ...prev, ...selected }));
  }

  return (
    <div>
      <header>
        <Header title="React-Elections" version="1.0" />
      </header>

      <main className="xl:px-30 lg:px-20 md:px-10 sm:px-5 px-3">
        <div className="pb-4">
          <ComboBox onChangeCombo={handleOnChange}>{allLabeledCities}</ComboBox>
        </div>
        <div className="border border-gray-300 flex flex-col">
          <DashHeader>{selectedCity}</DashHeader>
          <DashBody totalVotes={selectedCity.presence}>{elections}</DashBody>
        </div>
      </main>

      <footer>
        <Footer
          isChallenge
          moduleNum="2"
          moduleName="React I"
          date="Jun/2021"
        />
      </footer>
    </div>
  );
}
