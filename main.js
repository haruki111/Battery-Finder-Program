const battery =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
    ;

const camera =
    [{
        "brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
    ;


class View {
    static crateBrandOption() {
        let brandOption = document.getElementById("brand");
        let brand = Controller.unificationBrand();
        brandOption.innerHTML = `<option value=""></option>`;
        for (let i = 0; i < brand.length; i++) {
            brandOption.innerHTML +=
                `
                <option value="${i}">${brand[i]}</option>
                `;
        }
        brandOption.addEventListener("change", function () {
            View.createModelOption(brand);
        });
    }

    static createModelOption(brand) {
        let modelOption = document.getElementById("model");
        let modelPosition = Controller.unificationModel(brand);
        modelOption.innerHTML = `<option value=""></option>`;
        for (let i = modelPosition[0]; i < modelPosition[0] + modelPosition.length; i++) {
            modelOption.innerHTML +=
                `
                <option value="${i}">${camera[i].model}</option>
                `;
        }
        modelOption.addEventListener("change", function () {
            View.createBattery();
        });
    }

    static createBattery() {
        let CameraConsumptionWh = Number(Controller.getPowerConsumptionWh());
        let AccessoryPower = Number(Controller.returnAccessoryPower());
        if (AccessoryPower < 0 || AccessoryPower > 100) return;//アクセサリーが-の場合
        let TotalCameraConsumptionWh = CameraConsumptionWh + AccessoryPower;
        let input_battery = document.getElementById("input_battery");
        input_battery.innerHTML = "";

        let batterySort = Controller.isCameraSmallBattery(TotalCameraConsumptionWh);
        batterySort = Controller.sort(batterySort);

        for (let i = 0; i < batterySort.length; i++) {
            let capacityPower = batterySort[i].capacityAh * batterySort[i].voltage;
            input_battery.innerHTML +=
                `
                <div class="battery_wrap">
                    <div class="battery_name">${batterySort[i].batteryName}</div>
                    <div>Estimated ${Math.floor((capacityPower / TotalCameraConsumptionWh) * 10) / 10} hours on selected setup</div>
                </div>
                `;
        }
    }
}

class Controller {
    static inputPower() {
        document.getElementById("powerNum").addEventListener('input', function () {
            return View.createBattery();
        });
    }

    static unificationBrand() {
        let brand = [];
        for (let i = 0; i < camera.length; i++) {
            brand.push(camera[i].brand);
        }
        return brand = brand.filter(function (x, i, self) {
            return self.indexOf(x) === i;
        });
    }

    static unificationModel(brand) {//brandArray
        let modelPosition = [];
        let brandValue = Controller.returnCameraBrandValue();
        for (let i = 0; i < camera.length; i++) {//step1で選んだブランドの配列indexを取得
            if (camera[i].brand == brand[brandValue]) {
                modelPosition.push(i);
            }
        }
        return modelPosition;
    }

    static getPowerConsumptionWh() {
        let modelValue = Controller.returnCameraModelValue();
        return camera[modelValue].powerConsumptionWh;
    }

    static isCameraSmallBattery(TotalCameraConsumptionWh) {
        let batterySort = [];
        for (let i = 0; i < battery.length; i++) {
            let dischargeCapacity = battery[i].endVoltage * battery[i].maxDraw;
            if (TotalCameraConsumptionWh < Math.floor(dischargeCapacity * 10) / 10) {
                batterySort.push(battery[i]);
            }
        }
        return batterySort;
    }

    static sort(battery) {
        return battery.sort(function (a, b) {
            if (a.batteryName < b.batteryName) return -1;
            if (a.batteryName > b.batteryName) return 1;
            return 0;
        });
    }

    static returnCameraBrandValue() {
        return document.getElementById("brand").value;
    }

    static returnCameraModelValue() {
        return document.getElementById("model").value;
    }

    static returnAccessoryPower() {//step3の値を返す
        return document.getElementById("powerNum").value;
    }
}

function initializeApp() {
    let target = document.getElementById("target");
    target.innerHTML =
        `
        <header class="">Battery Finder Program</header>
        <main id="main" class="">
            <div class="inner">
                <div id="step1" class="select_brand">
                    <p class="step_text">step1: Select your brand</p>
                    <select name="" id="brand" class="select"></select>
                </div>
                <div id="step2" class="select_model">
                    <p class="step_text">step2: Select your Model</p>
                    <select name="" id="model" class="select"></select>
                </div>
                <div id="step3" class="input_accessory">
                    <p class="step_text">step3: Input Accessory Power Consumption</p>
                    <div>
                        <input type="number" step="1" max="100" min="0" class="number" id="powerNum" value="0" />
                        <label>W</label>
                    </div>
                </div>
                <div id="step4" class="choose_battery">
                    <p class="step_text">step4: Choose Your Battery</p>
                    <div id="input_battery"></div>
                </div>
            </div>
        </main>
        `;
}

initializeApp();
View.crateBrandOption();
Controller.inputPower();