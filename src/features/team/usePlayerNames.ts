import { useEffect, useState } from "react";

import axios from "axios";

const randomNamesApi = "https://namey.muffinlabs.com/name.json?count=10";

const usePlayerNames = () => {
  const [names, setNames] = useState<string[]>([]);

  const fetchNames = async () => {
    const fetchedNames = (await axios.get(randomNamesApi)).data;
    setNames([...names, ...fetchedNames]);
  };

  useEffect(() => {
    fetchNames();
  }, []);

  const pickRandomName = () => {
    const [first, ...rest] = names;
    setNames(rest);
    if (rest.length < 5) {
      fetchNames();
    }
    return first;
  };

  return pickRandomName;
};

export default usePlayerNames;
