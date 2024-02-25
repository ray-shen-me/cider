# [🍎  Cider](https://ciderai.tech)

Quickly create calendar events with Cider! Cider is an AI powered document analyzer that automatically creates .ICS calendar files with titles, dates, descriptions, locations, attendees, and more. 

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
Cider utilizes the API for OpenAI's GPT 3.5 model to analyze given text or documents in order to extract calendar event parameters. The app streams the model's response, enabling each event to be displayed as it arrives, just like ChatGPT's UI where users can see the model "typing" its response. Unlike many other AI apps, the user doesn't have to wait a long time to see the results.

Cider then uses the Google Maps Places API to enrich any locations found. 

For example, if the document contains: "Work on HackTJ project at Cvent HQ on Feb 24", Cider will generate an event with the place name "Cvent HQ", and query the Google Maps Places API, outputting the address "1765 Greensboro Station Pl 7th Floor, McLean, VA 22102", so the calendar information can be more precise.

To export the events, Cider compiles the event information, outputting to an .ICS file using the [ics](https://www.npmjs.com/package/ics) library created by Adam Gibbons. These files are supported by all devices and apps, like iOS, Android, Windows, MacOS, and Google Calendar.

To build the UI, we used Next.js as the framework, Tailwind.css for styling, and UI components built by us and from the "shadcn/ui" library. We used the "@cyber2024/pdf-parse-fixed" library to parse uploaded PDFs.

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
