# NANIL Pulse - Hardware & Software Research Report
**Date: 2026-03-15**
**Product: Silver Ring + Chest Patch + Smartphone App (BLE)**

---

## 1. BLE Sensor Chips for Smart Ring

### 1.1 Chip Comparison

| Feature | Nordic nRF52840 | Dialog DA14695 (Renesas) | Ambiq Apollo4 Blue Plus |
|---|---|---|---|
| **CPU** | Arm Cortex-M4F, 64 MHz | Arm Cortex-M33F, 144 dMIPS | Arm Cortex-M4F, 192 MHz (turboSPOT) |
| **BLE Version** | 5.3 | 5.2 | 5.4 |
| **Flash / RAM** | 1 MB / 256 KB | External QSPI Flash / 512 KB SRAM | 2 MB MRAM / 1.8 MB SRAM |
| **Power (active)** | ~6.3 mA RX, ~6.4 mA TX (0 dBm) | Ultra-low (integrated PMIC) | 4 uA/MHz (best-in-class) |
| **Size (package)** | 7x7 mm (aQFN73) / 3.5x3.6 mm (WLCSP) | 4.4x4.4 mm (WLCSP) | 3.26x3.26 mm (BGA) |
| **Special Features** | Multi-protocol (BLE, Thread, Zigbee, ANT, NFC), USB 2.0 | Integrated charger, PMIC, SIMO DCDC, JEITA charger, LCD/audio support | GPU (2.5D), AoA/AoD direction finding, best power efficiency |
| **Price (est.)** | ~$3.50-5.00 (1k qty) | ~$4.00-6.00 (1k qty) | ~$6.00-8.00 (1k qty) |
| **Ecosystem** | Largest community, Zephyr RTOS, nRF Connect SDK | SmartBond SDK, smaller community | Ambiq SDK, growing TinyML focus |

### 1.2 Which Chips Are Used by Competitors

| Product | Main SoC | PPG/Optical Sensor | Notes |
|---|---|---|---|
| **Oura Ring Gen 3** | Nordic nRF52 series | Custom AFE | Most established smart ring |
| **Oura Ring Gen 4** | Infineon PSoC 6 | MAX86178F (Analog Devices) | Switched away from Nordic |
| **Ultrahuman Ring AIR** | Nordic nRF52840 | Custom PPG array (green + red LEDs) | Confirmed via Nordic press release |
| **RingConn Gen 2** | Nordic nRF52 series (likely nRF52832) | PPG sensor | 12-day battery life |
| **Samsung Galaxy Ring** | Exynos W1000 (custom) | Custom Samsung Bio-sensor | Proprietary ecosystem |

### 1.3 PPG/Optical Sensor Chips (for HRV, SpO2, Heart Rate)

| Chip | Manufacturer | Channels | Features | Best For |
|---|---|---|---|---|
| **MAX86178** | Analog Devices | 6 LED + 4 PD, PPG + ECG + BioZ | 20-bit ADC, ALC, all-in-one AFE | Ring + Patch combo (PPG+ECG) |
| **MAX86141** | Analog Devices | 3 LED + 2 PD | Ultra-low power, dual readout | Ring-only PPG |
| **AS7058** | ams OSRAM | Multi-LED + PD | Ultra-low power AFE, HR/SpO2/respiration/BP | Smart ring optimized |
| **AS7038RB** | ams OSRAM | Single-channel | Smallest form factor | Ultra-compact ring |

### 1.4 Additional Sensors for Ring

| Sensor Type | Recommended Chip | Size | Notes |
|---|---|---|---|
| **Temperature** | MAX30205 (Analog Devices) | 2x2 mm WLP | +/-0.1C accuracy, I2C, clinical grade |
| **Accelerometer** | BMA400 (Bosch) | 2x2 mm LGA | Ultra-low power (< 6 uA), step counter, activity recognition |
| **IMU (6-axis)** | BMI270 (Bosch) | 2.5x3.0 mm LGA | Optimized for wearables, gesture recognition |

### 1.5 Recommendation for NANIL Pulse Ring

**Primary choice: Nordic nRF52840** combined with **ams AS7058** optical AFE.

Reasons:
- Largest developer ecosystem and community support
- Proven in Ultrahuman Ring AIR (direct competitor validation)
- Full Edge Impulse / TensorFlow Lite Micro support for on-device ML
- Zephyr RTOS with excellent BLE stack
- Multi-protocol support (BLE + NFC for tap-to-pair)
- The WLCSP package (3.5x3.6 mm) fits ring form factor

**Alternative: Nordic nRF54L15** (newer generation)
- 128 MHz, 22 nm process, better power efficiency than nRF52840
- Drop-in upgrade path from nRF52840 ecosystem
- Consider if available in volume by production date

---

## 2. Wearable SDKs and Health APIs

### 2.1 Apple HealthKit (iOS)

| Aspect | Details |
|---|---|
| **Platform** | iOS 8+, native Swift/Objective-C only |
| **Data Store** | Local on-device (no cloud API) |
| **Read Data** | Heart rate, HRV, SpO2, skin temperature, sleep, steps, workouts, respiratory rate, ECG |
| **Write Data** | Workouts, body measurements, nutrition, mindful minutes, custom types |
| **Permissions** | Granular per-data-type, must explain purpose strings |
| **Certification** | Apple App Store review, good privacy descriptions required |
| **Key Limitation** | Some types read-only from Apple Watch (e.g., ECG waveform), no web/backend API |
| **Cost** | Free (Apple Developer Program: $99/year) |

### 2.2 Google Health Connect (Android)

| Aspect | Details |
|---|---|
| **Platform** | Android 8.0+, Wear OS 8.0+ |
| **SDK** | Health Connect Jetpack Library (stable v1.1.0) |
| **Data Types** | Heart rate, steps, sleep sessions, skin temperature, exercise routes, mindfulness, SpO2, respiratory rate |
| **Medical Records** | FHIR format support (new in Android 16) |
| **Key Change** | Google Fit deprecated July 1, 2025 -- Health Connect is the replacement |
| **Cost** | Free |

### 2.3 Samsung Health SDK

| Aspect | Details |
|---|---|
| **Integration** | Via Google Health Connect (Samsung co-developed Health Connect) |
| **Sensor SDK** | Samsung Privileged Health SDK for Galaxy Watch sensors |
| **Data Types** | Same as Health Connect, plus Samsung-specific BioActive sensor data |
| **Requirement** | Samsung developer account, Galaxy Watch partnership for privileged access |

### 2.4 Fitbit SDK (Google)

| Aspect | Details |
|---|---|
| **Status** | Fitbit Web API still available, being merged into Google Health Connect |
| **Access** | OAuth 2.0, REST API for cloud data |
| **Data** | Heart rate, sleep, SpO2, skin temperature, activity, stress (EDA) |
| **Key Note** | Fitbit is transitioning to Pixel Watch / Health Connect ecosystem |

### 2.5 Unified Wearable APIs (Recommended Approach)

For NANIL Pulse, consider using a **unified health data aggregator** instead of integrating each SDK separately:

| Service | Supported Platforms | Pricing |
|---|---|---|
| **Thryve (thryve.health)** | Apple Health, Google Health Connect, Garmin, Fitbit, Oura, Whoop, Samsung | Per-user pricing |
| **Terra API** | 200+ wearable integrations, single API | Tiered pricing |
| **Momentum Open Wearables** | Apple Health, Health Connect, Samsung Health | Open source |

### 2.6 Certification Requirements

| Certification | When Needed | Cost / Timeline |
|---|---|---|
| **CE Mark (EU)** | Required for sale in EU | ~$10k-50k, 3-6 months |
| **FCC (USA)** | Required for BLE radio devices | ~$5k-15k, 4-8 weeks |
| **FDA 510(k) / De Novo** | If making medical claims (diagnosis, treatment) | $50k-500k+, 6-24 months |
| **HIPAA Compliance** | If handling PHI in USA | Organizational, ongoing |
| **GDPR** | If handling EU health data | Organizational, ongoing |
| **MDD/MDR (EU)** | If classified as medical device | ~$50k-200k, 12-24 months |

**Recommendation for NANIL Pulse:** Start as a "wellness device" (not medical device) to avoid FDA/MDR. Position as "wellness insights" not "diagnosis." This is what Oura, Whoop, and Ultrahuman do.

---

## 3. Voice Analysis / Biomarker APIs

### 3.1 Commercial APIs

#### Hume AI - Expression Measurement API
| Aspect | Details |
|---|---|
| **What it does** | Prosody analysis from speech: tone, rhythm, timbre |
| **Output** | 48 emotion dimensions per utterance (empathy, anxiety, frustration, relief, etc.) |
| **Granularity** | Word-level to full conversation turn |
| **Pricing** | Audio only: **$0.0639/min**, Video+Audio: $0.0828/min, Text: $0.00024/word |
| **EVI 2 (real-time)** | $0.072/min for interactive voice |
| **Free tier** | Available for development |
| **SDK** | Python, TypeScript, REST API |
| **Latency** | Batch processing (not real-time for Expression Measurement) |
| **Best for NANIL** | Emotion/stress/wellbeing tracking from daily voice samples |

#### Kintsugi Voice
| Aspect | Details |
|---|---|
| **What it does** | Clinical voice biomarkers for depression and anxiety detection |
| **Input** | 20 seconds of free-form speech |
| **Accuracy** | ~80% detection rate (validated in FDA De Novo submission) |
| **Output** | PHQ-8 (depression) and GAD-7 (anxiety) aligned scores |
| **Integration** | REST API, Java SDK, Python SDK |
| **Pricing** | Enterprise/B2B only (contact sales) |
| **FDA Status** | De Novo submission filed |
| **Best for NANIL** | Mental health wellness tracking (premium feature) |

#### Vocalis Health (formerly Beyond Verbal)
| Aspect | Details |
|---|---|
| **What it does** | Clinical voice biomarkers for respiratory, cardiac, and neurological conditions |
| **Focus** | COPD, CHF, depression, COVID-19 detection |
| **Approach** | Acoustic signal processing + ML |
| **Pricing** | Enterprise/clinical partnerships only |
| **Best for NANIL** | Future medical-grade expansion |

#### Ellipsis Health
| Aspect | Details |
|---|---|
| **What it does** | Vocal biomarker technology for anxiety and depression |
| **Approach** | NLP + acoustic models across age groups and cultural backgrounds |
| **Integration** | EHR, telehealth, remote patient monitoring |
| **Validation** | Clinically validated across diverse populations |
| **Pricing** | Enterprise (contact sales) |

### 3.2 Open Source Alternatives

| Tool | Language | Features | License | Best For |
|---|---|---|---|---|
| **openSMILE** | C++ (Python bindings) | Up to 6,000 acoustic features, eGeMAPS/ComParE feature sets | Free for research, commercial license available | Most comprehensive feature extraction, industry standard |
| **Praat / Parselmouth** | Python wrapper | F0 (pitch), formants, jitter, shimmer, HNR | GPL | Phonetic analysis, clinical voice quality |
| **librosa** | Python | MFCCs, spectral features, chroma, tempo | ISC (permissive) | Music + speech ML features, easy integration |
| **SpeechBrain** | Python/PyTorch | End-to-end speech processing, emotion recognition models | Apache 2.0 | Pre-trained emotion/speaker models |
| **Wav2Vec 2.0** | Python/PyTorch | Self-supervised speech representations | MIT | Transfer learning for voice biomarkers |

### 3.3 Recommendation for NANIL Pulse

**Phase 1 (MVP):** Use **Hume AI Expression Measurement API** for emotion/stress tracking from voice.
- Cost-effective at $0.064/min
- 48 emotion dimensions map well to "Kontext-Wellness"
- Easy REST API integration

**Phase 2 (On-device):** Use **openSMILE** (eGeMAPS feature set) + custom TFLite model on smartphone.
- Extract key features: F0 mean/std, jitter, shimmer, HNR, MFCCs
- Train classifier for stress/fatigue/wellbeing states
- Privacy-first: voice never leaves device

**Phase 3 (Premium):** Partner with **Kintsugi** for clinical mental health insights (if pursuing wellness-to-health pathway).

---

## 4. BLE Sensor Chips for Chest Patch

### 4.1 ECG Analog Front Ends

| Chip | Manufacturer | Key Specs | Power | Price (est.) | Best For |
|---|---|---|---|---|---|
| **MAX30003** | Analog Devices | Single-lead ECG, 32-word FIFO, built-in HR detection, ESD protection, DC leads-off detection | Ultra-low power, wake MCU every 256ms | ~$5-8 | **Recommended** - purpose-built for wearable patches |
| **AD8232** | Analog Devices | Single-lead ECG, motion artifact filter, fast restore | Higher power than MAX30003 | ~$2-4 | Budget option, good for prototyping |
| **MAX86178** | Analog Devices | PPG + ECG + BioZ combo | Moderate | ~$8-12 | All-in-one solution (if also doing PPG on patch) |
| **ADS1292R** | Texas Instruments | 2-channel 24-bit ADC, respiration measurement | Low power | ~$8-10 | Research-grade, dual-channel |

**MAX30003 vs AD8232 Key Differences:**
- MAX30003: Integrated FIFO (offloads MCU), built-in HR algorithm, better for battery-powered wearables
- AD8232: Simpler, cheaper, requires MCU to run all algorithms, better for prototyping/Arduino

### 4.2 Skin Conductance / GSR Sensors

| Approach | Implementation | Notes |
|---|---|---|
| **ADC-based** | Use SoC's built-in ADC + two electrodes | Simplest, no extra chip needed. Nordic nRF52840 has 12-bit ADC |
| **ADS1115** | TI 16-bit ADC | Higher precision GSR measurement |
| **Custom flexible electrodes** | Ag-Au nanowire arrays in polyimide (research) | Ultra-thin (6 um), adaptable to curved surfaces |
| **Chest placement** | Less common than finger/wrist, but validated in research | Conformal contact patches with conductive foam |

**Note:** GSR on chest is less established than finger/palm. Consider this as an experimental/differentiating feature for NANIL Pulse.

### 4.3 Temperature Sensors

| Chip | Manufacturer | Accuracy | Size | Interface | Price |
|---|---|---|---|---|---|
| **MAX30205** | Analog Devices | +/- 0.1 C | 2x2 mm WLP | I2C | ~$1-2 |
| **TMP117** | Texas Instruments | +/- 0.1 C | 2x2 mm WSON | I2C | ~$2-3 |
| **Si7051** | Silicon Labs | +/- 0.1 C | 3x3 mm DFN | I2C | ~$1-2 |

### 4.4 IMU / Accelerometer for Breathing Rate

| Chip | Manufacturer | Key Specs | Power | Size | Price |
|---|---|---|---|---|---|
| **BMI270** | Bosch | 6-axis IMU, wearable-optimized, gesture recognition | 25 uA (accelerometer low-power) | 2.5x3.0 mm | ~$2-3 |
| **BMA400** | Bosch | 3-axis accelerometer, ultra-low power | < 6 uA | 2x2 mm | ~$1-2 |
| **LSM6DSO** | STMicroelectronics | 6-axis IMU, ML core for activity detection | 0.55 mA | 2.5x3.0 mm | ~$2-3 |
| **ICM-42688** | TDK InvenSense | 6-axis IMU, ultra-low noise | 0.87 mA | 2.5x3.0 mm | ~$3-4 |

**Breathing rate detection:** Chest-mounted accelerometer/IMU detects thoracic wall motion during breathing. The BMI270 or BMA400 with deep learning algorithms can achieve clinical-grade respiratory rate measurement.

### 4.5 Recommended Patch BOM

| Component | Chip | Purpose |
|---|---|---|
| **BLE SoC** | Nordic nRF52840 (same as ring for shared firmware) | Processing + BLE |
| **ECG AFE** | MAX30003 | Single-lead ECG, HRV, HR detection |
| **IMU** | BMI270 | Breathing rate, activity, posture |
| **Temperature** | MAX30205 | Continuous skin temperature |
| **GSR** | Built-in ADC + electrodes | Skin conductance (stress indicator) |
| **Battery** | LiPo ~100-150 mAh (curved/flexible) | 3-5 day runtime target |

---

## 5. Edge ML Platforms

### 5.1 Edge Impulse

| Aspect | Details |
|---|---|
| **What it is** | End-to-end TinyML platform: data collection, training, optimization, deployment |
| **Nordic Support** | Official partnership, nRF52840 DK and nRF5340 DK fully supported |
| **Capabilities** | Motion detection, sound recognition, anomaly detection, image classification |
| **EON Compiler** | Optimizes processing and memory by up to 50% vs standard TFLite |
| **Pricing** | Free for developers (community plan), Enterprise plans for production |
| **Deployment** | Exports C++ library, integrates with Zephyr RTOS |
| **Best for NANIL** | Rapid prototyping of activity recognition, sleep staging, stress detection models |

### 5.2 TensorFlow Lite Micro (TFLite Micro)

| Aspect | Details |
|---|---|
| **What it is** | Google's ML inference framework for microcontrollers |
| **Nordic Support** | Runs on nRF52840 (Cortex-M4F), confirmed by multiple community projects |
| **Memory** | ~20-50 KB for simple models (fits in 256 KB RAM) |
| **Model Types** | CNNs, RNNs (small), fully connected networks |
| **Quantization** | INT8 quantization for reduced model size and faster inference |
| **Cost** | Free, open source (Apache 2.0) |
| **Limitations** | No training on-device, inference only |

### 5.3 What Can Run on Nordic nRF52840

| ML Task | Feasibility | Model Size | Inference Time |
|---|---|---|---|
| **Activity Recognition** (walk/run/sleep) | Excellent | ~10-30 KB | < 10 ms |
| **Sleep Stage Classification** | Good | ~20-50 KB | < 50 ms |
| **Heart Rate from PPG** | Good | ~15-40 KB | < 20 ms |
| **Anomaly Detection** (irregular heartbeat) | Good | ~10-20 KB | < 10 ms |
| **Breathing Rate from IMU** | Excellent | ~10-20 KB | < 10 ms |
| **Stress Level Estimation** | Moderate | ~30-80 KB | < 100 ms |
| **Voice Analysis** | Not feasible | Too large | Use smartphone |
| **Complex CNN/Transformer** | Not feasible | Exceeds memory | Use smartphone |

### 5.4 Other Edge ML Options

| Platform | Notes |
|---|---|
| **CMSIS-NN** | ARM's optimized neural network kernels for Cortex-M, used under the hood by TFLite Micro |
| **microTVM (Apache TVM)** | Compiler-based approach, can optimize models for specific hardware |
| **Ambiq NeuralSPOT** | Ambiq's own ML SDK for Apollo4, if switching to Ambiq SoC |
| **Nordic nRF Edge Impulse app** | Mobile app for data collection directly from nRF devices |

### 5.5 Recommended ML Architecture for NANIL Pulse

```
RING (nRF52840)                    PATCH (nRF52840)
  |                                   |
  | TFLite Micro:                     | TFLite Micro:
  | - Activity detection              | - ECG R-peak detection
  | - Sleep staging                   | - Breathing rate
  | - PPG -> HR/HRV/SpO2             | - Anomaly detection
  |                                   | - Skin temp trends
  |                                   |
  +------------- BLE ----------------+
                  |
            SMARTPHONE APP
                  |
          +-------+-------+
          |               |
     On-device ML    Cloud APIs
     (CoreML/ONNX)   (optional)
          |               |
     Voice Analysis   Hume AI
     (openSMILE +     (48 emotions,
      custom model)    $0.064/min)
          |               |
          +-------+-------+
                  |
          Context Engine
          ("Misst nicht mehr,
           interpretiert anders")
                  |
          Apple HealthKit /
          Google Health Connect
```

---

## 6. Summary & Recommendations

### Bill of Materials Estimate (Per Unit, 1k qty)

| Component | Ring | Patch |
|---|---|---|
| BLE SoC (nRF52840) | ~$4.00 | ~$4.00 |
| PPG AFE (AS7058) | ~$3.00 | - |
| ECG AFE (MAX30003) | - | ~$6.00 |
| IMU (BMI270) | ~$2.50 | ~$2.50 |
| Temperature (MAX30205) | ~$1.50 | ~$1.50 |
| Battery + PMIC | ~$3.00 | ~$2.00 |
| PCB + Enclosure | ~$8.00 | ~$5.00 |
| **Component Total** | **~$22.00** | **~$21.00** |

### Priority Roadmap

1. **Phase 1 - Prototype (3-6 months):** Nordic nRF52840 DK + Edge Impulse for rapid sensor algorithm development. Hume AI for voice analysis MVP.
2. **Phase 2 - Alpha Hardware (6-12 months):** Custom PCB with AS7058 (ring) + MAX30003 (patch). TFLite Micro models deployed on-device.
3. **Phase 3 - App Integration (9-15 months):** Apple HealthKit + Google Health Connect. openSMILE on-device voice features. Context engine combining ring + patch + voice.
4. **Phase 4 - Certification (12-18 months):** FCC + CE certification for BLE radio. Wellness positioning (avoid FDA/MDR initially).

---

## Sources

- [Nordic nRF52840 Product Page](https://www.nordicsemi.com/Products/nRF52840)
- [Novel Bits - 17 Most Popular BLE SoCs Compared](https://novelbits.io/17-most-popular-bluetooth-low-energy-chipsets-compared/)
- [Nordic nRF54L15 First Impressions](https://novelbits.io/nrf54l15-unboxing-first-impressions/)
- [Joint Chinese Smart Ring with nRF52840](https://www.nordicsemi.com/Nordic-news/2024/05/Joint-Chinese-LTD-chooses-Nordic-Semiconductor-for-next-generation-smart-ring)
- [Ultrahuman Ring AIR uses nRF52840](https://www.nordicsemi.com/Nordic-news/2023/09/The-Ultrahuman-Ring-Air-employs-nRF52840-SoC)
- [Ultrahuman Ring AIR Teardown](https://www.digikey.com/en/maker/blogs/2024/ultrahuman-ring-air-teardown)
- [Oura Ring Gen 3 Teardown (DigiKey)](https://www.digikey.com/en/maker/projects/oura-ring-teardown-gen-3-and-2/2c005e01f82d429398e78f49591793cc)
- [Oura Ring Gen 4 Teardown (TechInsights)](https://www.techinsights.com/blog/oura-ring-gen-4-teardown)
- [Smart Ring Development Guide (Memfault)](https://interrupt.memfault.com/blog/smart-ring-development-part-1)
- [Dialog DA14695 (Renesas)](https://www.renesas.com/en/applications/consumer-electronics/wearables/wearable-smart-ring-health-and-connectivity)
- [Ambiq Apollo4 Blue Plus](https://ambiq.com/apollo4-blue-plus/)
- [MAX86178 Datasheet](https://www.analog.com/en/products/max86178.html)
- [MAX86141 Datasheet](https://www.analog.com/en/products/max86141.html)
- [ams AS7058 Optical AFE](https://ams-osram.com/products/sensor-solutions/analog-frontend/ams-as7058-high-performance-vital-sign-analog-frontend)
- [MAX30003 ECG AFE](https://www.analog.com/en/products/max30003.html)
- [AD8232 ECG Sensor](https://www.analog.com/en/products/ad8232.html)
- [MAX30003 vs AD8232 Comparison](https://www.utmel.com/components/max30003-integrated-biopotential-afe-circuit-pinout-max30003-vs-ad8232-video-faq?id=2062)
- [BMI270 IMU (Bosch)](https://www.bosch-sensortec.com/en/products/motion-sensors/imus/bmi270)
- [Apple HealthKit Data Types](https://developer.apple.com/documentation/healthkit/data-types)
- [What You Can Do With HealthKit Data](https://www.themomentum.ai/blog/what-you-can-and-cant-do-with-apple-healthkit-data)
- [Google Health Connect Integration](https://mindsea.com/blog/apple-health-android-health-connect-integration-platforms-for-health-wellness-and-fitness/)
- [Google Fit Deprecation / Health Connect](https://www.thryve.health/blog/google-fit-api-deprecation-and-the-new-health-connect-by-android-what-thryve-customers-need-to-know)
- [Hume AI Expression Measurement](https://dev.hume.ai/docs/expression-measurement/overview)
- [Hume AI Pricing](https://www.hume.ai/pricing)
- [Hume AI Pricing Guide 2025](https://www.eesel.ai/blog/hume-ai-pricing)
- [Kintsugi Voice API](https://www.kintsugihealth.com/api/intro-to-kintsugi-voice-api)
- [Kintsugi Voice Biomarker Technology](https://www.kintsugihealth.com/solutions/kintsugivoice)
- [Ellipsis Health Vocal Biomarkers](https://www.ellipsishealth.com/research/how-ellipsis-healths-clinically-validated-vocal-biomarker-technology-is-breaking-down-barriers-in-the-mental-health-sphere/)
- [Voice Biomarkers in Mental Health (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC8138221/)
- [Voice Biomarker AI (FDA)](https://www.fda.gov/media/189837/download)
- [openSMILE Documentation](https://audeering.github.io/opensmile/)
- [Comparative Evaluation: openSMILE vs Praat vs librosa](https://arxiv.org/html/2506.01129v1)
- [Edge Impulse + Nordic nRF52840](https://docs.edgeimpulse.com/hardware/boards/nordic-semi-nrf52840-dk)
- [Nordic + Edge Impulse TinyML Partnership](https://www.edgeimpulse.com/blog/nordic-embedded-machine-learning/)
- [TensorFlow on Nordic nRF52840](https://www.hackster.io/news/tensorflow-on-the-nordic-nrf52840-ed9f03326a23)
- [Wearable Chest Patch Respiratory Monitoring](https://pubmed.ncbi.nlm.nih.gov/35275808/)
- [Accelerometer-Based Breathing Rate Detection](https://www.mdpi.com/2079-6374/14/3/118)
