import { Component, OnInit, NgZone } from "@angular/core";
import { NavController, ToastController } from "ionic-angular";
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner";
import { Web3Service } from "../../services/web3.service";
const TrackInfo_artifacts = require("../../../build/contracts/TrackingInfo.json");
declare let require: any;

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit {
  productDetail: any;
  domElement: any;
  accounts: string[];
  TrackInfo: any;

  model = {
    amount: 5,
    receiver: "",
    balance: 0,
    account: ""
  };

  status = "";
  constructor(
    public navCtrl: NavController,
    private qrScanner: QRScanner,
    private ngZone: NgZone,
    private web3Service: Web3Service,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.domElement = window.document.querySelector("ion-app") as HTMLElement;
    this.prepare();

    this.web3Service
      .artifactsToContract(TrackInfo_artifacts)
      .then(TrackInfoAbstraction => {
        this.TrackInfo = TrackInfoAbstraction;
      })
      .catch(err => {
        console.log(err);
      });
  }

  async setStatus(status) {
    const alert = await this.toastController.create({
      cssClass: "my-custom-class",
      message: status,
      duration: 2000
    });

    await alert.present();
  }

  ionViewWillLeave() {
    this.hideCamera();
  }

  async sendLog() {
    if (!this.TrackInfo) {
      this.setStatus("TrackInfo is not loaded, unable to send transaction");
      return;
    }

    this.setStatus("Initiating transaction... (please wait)");
    try {
      const deployedTrackInfo = await this.TrackInfo.deployed();

      let cat_id = this.productDetail.category_id
        ? this.productDetail.category_id
        : 0;
      let image = this.productDetail.image ? this.productDetail.image : "";
      let sku = this.productDetail.sku ? this.productDetail.sku : "";
      let sub_cat_id = this.productDetail.sub_category_id
        ? this.productDetail.sub_category_id
        : 0;

      const transaction = await deployedTrackInfo.registerScan.call(
        this.productDetail.id,
        this.productDetail.name,
        this.productDetail.quantity,
        cat_id,
        sub_cat_id,
        image,
        sku,
        ""
      );

      if (!transaction) {
        this.setStatus("Transaction failed!");
      } else {
        this.setStatus("Transaction complete!");
      }
    } catch (e) {
      console.log(e);
      this.setStatus("Error sending coin; see log.");
    }
  }

  prepare() {
    this.qrScanner
      .prepare()
      .then((status: QRScannerStatus) => {
        console.log(status.authorized);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Run this function.
  showCamera() {
    this.qrScanner.show();
    this.domElement.classList.add("has-camera");

    const scanSub = this.qrScanner.scan().subscribe((text: string) => {
      scanSub.unsubscribe();
      this.onScan(text);
    });
  }

  hideCamera() {
    this.qrScanner.hide();
    this.domElement.classList.remove("has-camera");
  }

  IsJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  onScan(text: any) {
    this.hideCamera();
    if (this.IsJsonString(text)) {
      this.ngZone.run(() => {
        this.productDetail = JSON.parse(text);
        this.sendLog();
      });
    }else if(text && text.result){
      this.ngZone.run(() => {
        this.productDetail = JSON.parse(text.result);
        this.sendLog();
      });
    }
  }

  noImgUrlAlt(event) {
    event.target.src = "../../assets/imgs/no-image.jpg";
  }
}
