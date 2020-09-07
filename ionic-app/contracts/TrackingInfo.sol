pragma solidity >=0.4.22 <0.7.0;

/** 
 * @title ScanTrackingInfo
 * @dev Implements add TrackingInfo on product QRcode scan
 */
contract TrackingInfo {
   uint TotalScan = 0;
    struct Info {
        uint Id; // product id
        string Name; // Name of the product
        uint Qty; // product Quantity
        string Category; // product Category
        string SubCategory; // product SubCategory
        string Image; // product image
        string SKU; // product SKU
        uint ScanDateTime; // qr code scan time
        string DeviceId2; //device identity
    }
    
    /**
     * @title : manage scans per product
     */
     mapping (uint => Info) public Scans;
    
    
    constructor() public {
    }
    
    /** 
     * @dev register product scan
     * @return boolean success or error 
     */
    function registerScan( uint Id, string memory Name , uint Qty, string memory Category, string memory SubCategory, string memory Image, string memory SKU,string memory DeviceId) public payable returns (uint) {
       require( Id != 0, "Id is required");
       require( bytes(Name).length > 0, "Name is required");
       require( Qty != 0 , "Qty is required");
       //require( bytes(Category).length > 0, "Category is required");
       //require( bytes(SubCategory).length > 0, "SubCategory is required");
       //require( bytes(Image).length > 0, "Image is required");
       //require( bytes(SKU).length > 0, "SKU is required");
       //require( bytes(DeviceId).length > 0, "DeviceId is required");
        
        Scans[TotalScan].Id = Id;
        Scans[TotalScan].Name = Name;
        Scans[TotalScan].Qty = Qty;
        Scans[TotalScan].Category = Category;
        Scans[TotalScan].SubCategory = SubCategory;
        Scans[TotalScan].Image = Image;
        Scans[TotalScan].SKU = SKU;
        Scans[TotalScan].ScanDateTime = now;
        Scans[TotalScan].DeviceId2 = DeviceId;
        TotalScan++;
        return TotalScan-1;
    }
   
}