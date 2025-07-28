# 🌾 SoilSense – Open-Source AI Platform for Smarter Farming in India

**SoilSense** is a multilingual, open-source AI platform designed to empower Indian farmers with real-time decision support, personalized crop advisory, insurance claim automation, market intelligence, and proactive notifications. Inspired by the power of agentic systems, SoilSense enables AI agents to communicate, remember, and collaborate like a team of expert Krishi officers.

> 🧒‍♂️ Made for Bharat. Spoken in Your Language. Driven by AI that remembers.

---

## ✨ Core Features Overview

### 🧠 Agentic Intelligence

* Modular AI agents communicate via **Model Context Protocol** (MCP)
* Enables agent-to-agent collaboration: pest detection, weather alerts, claim automation
* Supports plug-and-play agent orchestration (LangGraph, CrewAI)

### 🌿 Personalized AI with Memory

* Stores farmer profiles, crop history, location, irrigation schedule, preferred mandi
* Remembers past interactions and adapts recommendations accordingly
* Built with persistent memory using vector stores (Chroma, FAISS, Qdrant)

### 🔔 Memorae-Style Smart Recommendations

* Contextual nudges: irrigation, spraying, pest check reminders
* Scheme alerts (PMFBY, PM-KISAN, Soil Health Card)
* Market price notifications, weather-driven actions
* Delivered via voice, WhatsApp, SMS, and app-based push alerts

---

## 🌐 Multilingual Access Channels

| Channel              | Description                                                      |
| -------------------- | ---------------------------------------------------------------- |
| 🔊 Voice Bot (IVR)   | Call to interact in your language. Built with AI4Bharat ASR/TTS. |
| 💬 WhatsApp Bot      | Send voice/images and receive crop or scheme support instantly.  |
| 🔎 Web App (PWA)     | Browser-based chatbot, offline-ready and no installation needed. |
| 📻 SMS Alerts        | Market price/weather/news alerts for feature phones.             |
| 👷‍♂️ KVK Kiosk Mode | Tablet UI for FPOs, KVKs, Agri Officers to assist locally.       |

---

## 🌾 Use Case Modules

### 📸 Pest Surveillance & Crop Advisory

* Drone/phone captures geotagged image
* AI agent classifies pest type or deficiency
* Advisory agent translates recommendation to farmer’s language

### ☔️ Smart Insurance Claim (PMFBY)

* Weather agent flags excess rainfall
* Damage verification via satellite + IoT sensors
* Insurance agent checks PMFBY eligibility and initiates claim

### 🌿 Mandi Price Forecasting

* Pulls real-time + 7-day forecast prices from AgMarkNet
* Recommends optimal sale time and nearby mandi options
* Delivers alerts in language of choice

### 📋 Personalized Scheme Assistant

* Fetches land + Aadhaar data via DigiLocker
* Fills out forms, flags upcoming deadlines
* Tracks subsidy eligibility (organic, seeds, PM-KISAN)

### 🌧️ Smart Irrigation Reminders

* Uses rainfall forecast + soil + crop schedule
* Advises watering dates
* Reminds farmers via voice/SMS the night before

---

## 📆 Notification & Memory Engine (Inspired by Memorae)

| Type                       | Example                                                            |
| -------------------------- | ------------------------------------------------------------------ |
| 📆 Seasonal Alerts         | "Next sowing window opens in 3 days for groundnut in Guntur."      |
| ⚠️ Risk Warnings           | "Pest infestation likely. Neem spray recommended before Thursday." |
| 🌾 Action Nudges           | "It's been 2 weeks since pesticide. Time to scout again."          |
| 📚 Habit-aware Support     | Prioritize turmeric crop news if farmer frequently discusses it    |
| 📲 Form Deadlines Reminder | "PMFBY registration deadline in 4 days. Shall we file it now?"     |

---

## 🔄 Architecture Overview

```bash
soilsense/
├── agents/
│   ├── crop_health_agent/
│   ├── insurance_agent/
│   ├── mandi_price_agent/
│   ├── input_locator_agent/
│   ├── weather_agent/
│   └── scheme_assistant_agent/
├── farmer_interface/
│   ├── voice_bot/
│   ├── whatsapp_connector/
│   ├── sms_handler/
│   └── pwa_chat_ui/
├── memory_engine/
│   ├── farmer_profile_store.py
│   └── reminder_scheduler.py
├── infra/
│   └── model_context_protocol/
├── data/
│   ├── translations/
│   ├── mandi_prices/
│   └── soil_health/
├── docs/
└── README.md
```

---

## 🚀 Getting Started

```bash
# Clone repo
$ git clone https://github.com/your-org/soilsense && cd soilsense

# Set up environment
$ python3 -m venv venv && source venv/bin/activate
$ pip install -r requirements.txt

# Launch FastAPI server
$ uvicorn app.main:app --reload
```

---

## 📊 Sample Farmer Profile Memory (Pydantic)

```python
class FarmerProfile(BaseModel):
    name: str
    language: str
    phone_number: str
    land_location: str
    crops_grown: List[str]
    preferred_mandi: Optional[str]
    last_interactions: List[Dict]
    upcoming_reminders: List[str]
    subsidy_enrollments: Dict[str, bool]
    irrigation_schedule: Optional[str]
```

---

## 🌟 Roadmap

* [x] Multilingual advisory agents
* [x] Weather, market, pest modules
* [x] Voice + WhatsApp bot interface
* [x] Persistent memory + reminders
* [ ] LangGraph-based agent flow dashboard
* [ ] Farmer sentiment analysis via voice
* [ ] Geo-tagged crop planning assistant
* [ ] Federated model retraining across FPOs

---

## 🌐 Languages Supported

* Hindi
* Marathi
* Tamil
* Bengali
* Telugu
* Kannada
* Punjabi
* Assamese
  *(Powered by AI4Bharat models)*

---

## 🙌 Contributors & Partners

* [AI4Bharat](https://ai4bharat.org)
* [ICAR / Krishi Vigyan Kendras](https://icar.gov.in)
* \[Open source agri-tech community]
* \[Farmers & NGOs testing in the field]

---

## 🔓 License

This project is licensed under the MIT License.

---

## 🚀 Join the Movement

Help grow SoilSense into the backbone of India’s open-source agri-intelligence.

* Fork the repo
* Run it for your state/language
* Contribute new agents, crops, or local integrations

> **SoilSense** — Where AI speaks the language of your soil, your crop, and your future. 🌱
