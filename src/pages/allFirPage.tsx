import { useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardTitle,
  IonContent,
  IonCardContent,
  IonPage,
} from "@ionic/react";
import { PDFGenerator } from "@ionic-native/pdf-generator";
import axios from "axios";
import "./allFirPage.css";
// import { PDFDocument, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";
import { backendURL } from "../env";
import Header from "./header";
import { PDFDocument, PDFPage } from 'react-native-pdf-lib';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

interface Issue {
  id: number;
  date: string;
  userid: number;
  time: string;
  fullName: string;
  contactNumber: string;
  address: string;
  incidentDate: string;
  incidentTime: string;
  location: string;
  incidentType: string;
  incidentDescription: string;
  witnessName: string;
  witnessContactNumber: string;
  witnessAddress: string;
  status: string;
}

const AllFirPage: React.FC = () => {
  const [issueList, setIssueList] = useState<Issue[]>([]);
  const [reload, setReload] = useState<number>(0);
  const [canChange, setCanChange] = useState<boolean>(false);

  console.log(reload);
  useEffect(() => {
    axios
      .post(`${backendURL}getallfir`)
      .then((e) => {
        console.log(e.data.data);
        let firData = e.data.data;
        setIssueList(firData);
      })
      .catch((e) => {
        console.log(e);
        alert("there is some error feching data");
      });
  }, [reload]);

  useEffect(() => {
    let role = localStorage.getItem("role");
    if (role === "admin") {
      setCanChange(true);
    }
  }, []);


const generatePDF = async (data:any)=>{
  const content = `
  ID: ${data.id}
  Date: ${data.date}
  User ID: ${data.userid}
  Time: ${data.time}
  Full Name: ${data.fullName}
  Contact Number: ${data.contactNumber}
  Address: ${data.address}
  Incident Date: ${data.incidentDate}
  Incident Time: ${data.incidentTime}
  Location: ${data.location}
  Incident Type: ${data.incidentType}
  Incident Description: ${data.incidentDescription}
  Witness Name: ${data.witnessName}
  Witness Contact Number: ${data.witnessContactNumber}
  Witness Address: ${data.witnessAddress}
  Status: ${data.status}
`;
  let options = {
    documentSize: 'A4',
    type: 'share',
    // landscape: 'portrait',
    fileName: 'Order-Invoice.pdf'
  };
  PDFGenerator.fromData(content, options) .then((base64: any) => { console.log('OK', base64) }).catch((error: any) => {
      console.log('error', error);
    });

}


  // const generatePDF = async (data:any) => {
  //   const pdfDoc = PDFPage.create();

  //   const page = pdfDoc.addPage();
  //   const { width, height } = page.getSize();



  //   const textWidth = 200;
  //   const textHeight = 400;

  //   page.drawText(content, {
  //     x: (width - textWidth) / 2,
  //     y: height - textHeight - 50,
  //     width: textWidth,
  //     height: textHeight,
  //     font: await pdfDoc.embedFont('Helvetica'),
  //     fontSize: 12,
  //     lineHeight: 16,
  //     align: 'justify',
  //   });

  //   const pdfBytes = await pdfDoc.save();
  //   const fileName = 'my-pdf.pdf';
  //   const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

  //   await RNFS.writeFile(filePath, pdfBytes, 'base64');
  //   await FileViewer.open(filePath);
  // };

  // const createPDF = async (data: any) => {
  //   // Create a new PDF document
  //   const pdfDoc = await PDFDocument.create();

  //   // Add a new page to the PDF document
  //   const page = pdfDoc.addPage();

  //   // Set the font and font size
  //   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  //   const fontSize = 12;

  //   // Set the initial y position for the text
  //   let y = page.getHeight() - 50;

  //   // Helper function to add text to the PDF
  //   const addText = (text: any) => {
  //     page.drawText(text, {
  //       x: 50,
  //       y: y,
  //       size: fontSize,
  //       font: font,
  //     });
  //     y -= fontSize + 5;
  //   };

  //   addText(`Date: ${data.date}`);
  //   addText(`Time: ${data.time}`);
  //   addText(`Full Name: ${data.fullName}`);
  //   addText(`Contact Number: ${data.contactNumber}`);
  //   addText(`Address: ${data.address}`);
  //   addText(`Incident Date: ${data.incidentDate}`);
  //   addText(`Incident Time: ${data.incidentTime}`);
  //   addText(`Location: ${data.location}`);
  //   addText(`Incident Type: ${data.incidentType}`);
  //   addText(`Incident Description: ${data.incidentDescription}`);
  //   addText(`Witness Name: ${data.witnessName}`);
  //   addText(`Witness Contact Number: ${data.witnessContactNumber}`);
  //   addText(`Witness Address: ${data.witnessAddress}`);
  //   addText(`Status: ${data.status}`);

  //   // Save the PDF document as a blob
  //   const pdfBytes = await pdfDoc.save();

  //   // Create a new blob URL
  //   const blobUrl = URL.createObjectURL(
  //     new Blob([pdfBytes], { type: "application/pdf" })
  //   );

  //   // Download the PDF document
  //   saveAs(blobUrl, "incident-report.pdf");
  // };

  function setSolve(e: number) {
    let data = { id: e, status: "resolved" };
    axios
      .post(`${backendURL}setStatusSolve`, data)
      .then((e) => {
        setReload(reload + 1);
      })
      .catch(() => {
        console.log("-=-=--=-=-", e);
      });
  }

  function setDiscart(e: number) {
    let data = { id: e, status: "Discard" };
    axios
      .post(`${backendURL}setStatusSolve`, data)
      .then((e) => {
        setReload(reload + 1);
      })
      .catch(() => {
        console.log("-=-=--=-=-", e);
      });
  }
  return (
    <IonPage>
      <Header title="All Complaines" />
      <IonContent>
        <div className="box">
          <div className="allComplains">
            <h1>All Complains</h1>
          </div>
          {issueList.map((issue) => (
            <div key={issue.id}>
              <div className="label-box">

              <IonCard className="my-table">
                <IonCardTitle> Complainer Info</IonCardTitle>
                <IonCardContent>complian Date :{issue.date}</IonCardContent>
                <IonCardContent>complian time :{issue.time}</IonCardContent>
                <IonCardContent>
                  complianer name :{issue.fullName}
                </IonCardContent>
                <IonCardContent>
                  complianer number :{issue.contactNumber}
                </IonCardContent>
                <IonCardContent>
                  complainer address :{issue.address}
                </IonCardContent>
                <IonCardTitle>Incident Info</IonCardTitle>

                <IonCardContent>
                  {" "}
                  Incident date: {issue.incidentDate}
                </IonCardContent>
                <IonCardContent>
                  Incident Time : {issue.incidentTime}
                </IonCardContent>
                <IonCardContent>
                  Incident loaction: {issue.location}
                </IonCardContent>
                <IonCardContent>
                  Incident type: {issue.incidentType}
                </IonCardContent>
                <IonCardContent>
                  Incident Description :{issue.incidentDescription}
                </IonCardContent>

                <IonCardTitle> witness info</IonCardTitle>
                <IonCardContent>
                  witness name: {issue.witnessName}
                </IonCardContent>
                <IonCardContent>
                  witness Contact Number: {issue.witnessContactNumber}
                </IonCardContent>
                <IonCardContent>
                  witness Address: {issue.witnessAddress}
                </IonCardContent>
                <IonCardContent>issue status: {issue.status}</IonCardContent>
              </IonCard>
              {issue.status !== "resolved" && canChange ? (
                <IonButton
                  fill="clear"
                  onClick={(e) => {
                    setSolve(issue.id);
                  }}
                >
                  Solved
                </IonButton>
              ) : (
                ""
              )}
              {issue.status !== "Discard" && canChange ? (
                <IonButton
                  fill="clear"
                  onClick={(e) => {
                    setDiscart(issue.id);
                  }}
                >
                  Discard
                </IonButton>
              ) : (
                ""
              )}
              {/* <IonButton
                fill="clear"
                onClick={() => {
                  generatePDF(issue);
                }}
              >
                save as PDF
              </IonButton> */}
              </div>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>

    // <>
    // <div className="allComplains">
    //   <h1>All Complains</h1>
    // </div>
    // </>
  );
};

export default AllFirPage;
