import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend, Title);

const ChartConfig = ({ chartData }: any) => {
  return (
    <div
      className="chart-container"
      style={{
        width: "100%",
        height: "700px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontWeight: "bold",
          color: "gray",
          textTransform: "uppercase",
          fontSize: 24,
          width: "100%",
          marginBottom: 20,
          marginTop: 80,
        }}
      >
        Phân tích theo loại kết quả
      </h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Đây là số liệu phân tích toàn bộ theo từng kết quả",
            },
            legend: {
              labels: {
                font: {
                  size: 16,
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default ChartConfig;
