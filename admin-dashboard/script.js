const ctx = document.getElementById("salesChart");
new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    datasets: [{
      label: "Sales",
      data: [120,190,300,250,220,340,400],
      borderColor: "#4f46e5",
      backgroundColor: "rgba(79,70,229,0.2)",
      tension: 0.3
    }]
  },
  options: { responsive: true, maintainAspectRatio: false }
});