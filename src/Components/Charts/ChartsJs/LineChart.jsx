import React,{useEffect,useState} from 'react';
import { Col, Card, CardBody,Row,Label,Input } from "reactstrap";
import HeaderCard from '../../Common/Component/HeaderCard';
import { Line } from 'react-chartjs-2';
import { lineChartData1, lineChartOptions,lineChartData } from '../../../Data/Chart/chartjs';

const LineChartClass = () => {
        const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [chartData, setChartData] = useState(null);

  
  useEffect(() => {
    // 🔹 Replace with real API
    const data = [
      { company: "Google", weekly: [120, 150, 180, 210] },
      { company: "Amazon", weekly: [90, 130, 160, 200] },
      { company: "Microsoft", weekly: [100, 140, 170, 190] },
    ];

    setCompanies(data);
    setSelectedCompany(data[0].company); // default selection
  }, []);

  useEffect(() => {
    if (!selectedCompany) return;

    const companyData = companies.find(
      (c) => c.company === selectedCompany
    );

    if (!companyData) return;

    setChartData({
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: selectedCompany,
          data: companyData.weekly,
          borderColor: "#24695C",
          backgroundColor: "rgba(36,105,92,0.3)",
          borderWidth: 2,
          tension: 0.4,
          fill: true,
        },
      ],
    });
  }, [selectedCompany, companies]);
    return (
        <>
       <Card>
      <HeaderCard title="Weekly Company Transactions" />
      <CardBody>
        <Row className="mb-3">
          <Col md="4">
            <Label>Select Company</Label>
            <Input
              type="select"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
            >
              {companies.map((c) => (
                <option key={c.company} value={c.company}>
                  {c.company}
                </option>
              ))}
            </Input>
          </Col>
        </Row>

        {chartData && (
          <Row>
            <Col sm="12">
              <Line data={chartData} options={lineChartOptions} width={717} height={200}/>
            </Col>
          </Row>
        )}
      </CardBody>
    </Card>
        </>
    )
}

export default LineChartClass;