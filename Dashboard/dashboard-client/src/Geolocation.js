export function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    <p>Geolocation ne marche pas sur votre navigateur</p>
  }
}

function showPosition(position) {
  document.write("Latitude: " + getLatitude(position) + "<br>Longitude: " + getLongitude(position));
}

export function getLatitude(position) {
  return (position.coords.latitude)
}

export function getLongitude(position) {
  return (position.coords.longitude)
}
