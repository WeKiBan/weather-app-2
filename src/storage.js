class Storage {
  constructor() {
    // local storage keys
    this.LOCAL_STORAGE_LIST_KEY = 'locations';
    this.LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'selected.id';
    // list of locations
    this.locations = JSON.parse(
      localStorage.getItem(this.LOCAL_STORAGE_LIST_KEY)
    ) || [
      {
        id: 1,
        name: 'London',
        country: 'United Kingdom',
        coordinates: { lng: '-0.1276474', lat: '51.5073219' },
      },
    ];
    this.selectedLocationId =
      JSON.parse(
        localStorage.getItem(this.LOCAL_STORAGE_SELECTED_LIST_ID_KEY)
      ) || 1;
  }
  // Function to save to local storage
  saveToLocalStorage() {
    localStorage.setItem(
      this.LOCAL_STORAGE_LIST_KEY,
      JSON.stringify(this.locations)
    );

    localStorage.setItem(this.LOCAL_STORAGE_SELECTED_LIST_ID_KEY, this.selectedLocationId);
  }
  // Function to add new location
  addLocation(location) {
    this.locations.push(location);
  }
  // Function to return selected location
  findSelectedLocation() {
    // find location with selectedListId
    const location = this.locations.find(
      (location) => location.id == this.selectedLocationId
    );
    return location;
  }
}

export const storage = new Storage();
