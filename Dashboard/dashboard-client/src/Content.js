import React, { useState } from "react";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import { withSize } from "react-sizeme";
import TopBar from "./TopBar";
import CurrencyWidget from "./service/Exchange";
import GeolocaWidget from "./service/Geolocation";
import DisplayWeather from "./service/Weather";
import { CovidCountryWidget, CovidCountryChartWidget, CovidGlobalWidget } from "./service/Covid";
import GoogleCalendar from "./service/Gmail";

const originalItems = ["a", "b", "c", "d", "e", "f", "g"];

const initialLayouts = {
  lg: [
    { i: "a", x: 0, y: 0, w: 1, h: 4 },
    { i: "b", x: 1, y: 0, w: 3, h: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 4 },
    { i: "d", x: 0, y: 4, w: 2, h: 4 },
    { i: "e", x: 2, y: 1, w: 0, h: 4 },
    { i: "f", x: 2, y: 1, w: 0, h: 4 },
    { i: "g", x: 1, y: 1, w: 0, h: 4 }  
  ]
};
function Content({ size: { width } }) {
  const [items, setItems] = useState(originalItems);
  const [layouts, setLayouts] = useState(
    getFromLS("layouts") || initialLayouts
  );
  const onLayoutChange = (_, allLayouts) => {
    setLayouts(allLayouts);
  };
  const onLayoutSave = () => {
    saveToLS("layouts", layouts);
  };
  const onRemoveItem = (itemId) => {
    setItems(items.filter((i) => i !== itemId));
  };
  const onAddItem = (itemId) => {
    setItems([...items, itemId]);
  };

  return (
    <>
      <TopBar
        onLayoutSave={onLayoutSave}
        items={items}
        onRemoveItem={onRemoveItem}
        onAddItem={onAddItem}
        originalItems={originalItems}
      />
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={160}
        width={2600}
        onLayoutChange={onLayoutChange}
      >
        {items.map((key) => (
          <div
            key={key}
            className="widget"
            data-grid={{ w: 3, h: 2, x: 0, y: Infinity }}
          >
            {key == "a" ? (
              < GeolocaWidget
                id={key}
                onRemoveItem={onRemoveItem}
                backgroundColor="#867ae9"
              />) : (key == "b" ? (
                < CovidCountryChartWidget
                  id={key}
                  onRemoveItem={onRemoveItem}
                  backgroundColor="#867ae9"
                />) : (key == "c" ? (
                  < CovidCountryWidget
                    id={key}
                    onRemoveItem={onRemoveItem}
                    backgroundColor="#867ae9"
                  />) : (key == "d" ? (
                    < CovidGlobalWidget
                      id={key}
                      onRemoveItem={onRemoveItem}
                      backgroundColor="#867ae9"
                    />) : (key == "e" ? (
                      < CurrencyWidget
                        id={key}
                        onRemoveItem={onRemoveItem}
                        backgroundColor="#867ae9"
                      />) : (key == "f" ? (
                      < DisplayWeather
                        id={key}
                        onRemoveItem={onRemoveItem}
                        backgroundColor="#867ae9"
                      />) : 
                      <GoogleCalendar
                        id={key}
                        onRemoveItem={onRemoveItem}
                        backgroundColor="#867ae9"
                      />)
                ))
              )
            )
            }
          </div>
        )
        )
        }
      </ResponsiveGridLayout>
    </>
  );
}

export default withSize({ refreshMode: "debounce", refreshRate: 60 })(Content);

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) { }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}
