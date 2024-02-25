# [🍎  Cider](https://ciderai.tech)

Quickly create calendar events with Cider! Cider is an AI powered document analyzer that automatically creates .ics files with titles, dates, descriptions, etc. 

## [🌍 Live demo](https://ciderai.tech)

Create calendar events on a live demo of Cider at https://www.ciderai.tech/

## 📦 Install Cider locally

Use [git](https://git-scm.com/downloads) to install Cider.

```bash
git clone https://github.com/ray-shen-me/cider.git
```

## 💻 Run Cider locally

```bash
git clone https://github.com/ray-shen-me/cider.git
npm install
npm run dev
```
## 🤔 How it works
Cider utilizes OpenAI's Chat-GPT 3.5 model API to analyze given text or documents in order to extract calendar event parameters.

The Google Maps Places API is then used in order to enrich the location found. For example, an input of Cvent HQ would output the formmated address, 1765 Greensboro Station Pl 7th Floor, McLean, VA 22102, so the calendar infomation can be more precise. 

All the information is then compiled and outputed to an .ics file using the [ics](https://www.npmjs.com/package/ics) library created by Adam Gibbons.

## 💞 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

<!-- ## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here) -->

## Authors

- [@kendotzhou](https://www.github.com/notken12)
- [@rayyshen](https://www.github.com/rayyshen)


## 🔑 License
[MIT](https://choosealicense.com/licenses/mit/)