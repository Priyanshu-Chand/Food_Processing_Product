import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const pieColors = ['#1F5B42', '#DE7C2D', '#7F9B76', '#DDB668'];

export default function Chart({
  title,
  subtitle,
  data,
  variant = 'area',
  xKey = 'name',
  dataKey = 'value',
  colors = pieColors,
}) {
  const renderChart = () => {
    if (variant === 'bar') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="rgba(31, 91, 66, 0.08)" vertical={false} />
            <XAxis axisLine={false} dataKey={xKey} tickLine={false} stroke="#56705F" />
            <YAxis axisLine={false} tickLine={false} stroke="#56705F" />
            <Tooltip
              contentStyle={{
                borderRadius: 18,
                border: '1px solid rgba(255,255,255,0.65)',
                background: 'rgba(255,255,255,0.92)',
              }}
            />
            <Bar barSize={28} dataKey={dataKey} fill="#DE7C2D" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (variant === 'pie') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{
                borderRadius: 18,
                border: '1px solid rgba(255,255,255,0.65)',
                background: 'rgba(255,255,255,0.92)',
              }}
            />
            <Pie
              cx="50%"
              cy="50%"
              data={data}
              dataKey={dataKey}
              innerRadius={58}
              outerRadius={92}
              paddingAngle={4}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="salesGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#1F5B42" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#1F5B42" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(31, 91, 66, 0.08)" vertical={false} />
          <XAxis axisLine={false} dataKey={xKey} tickLine={false} stroke="#56705F" />
          <YAxis axisLine={false} tickLine={false} stroke="#56705F" />
          <Tooltip
            contentStyle={{
              borderRadius: 18,
              border: '1px solid rgba(255,255,255,0.65)',
              background: 'rgba(255,255,255,0.92)',
            }}
          />
          <Area
            dataKey={dataKey}
            fill="url(#salesGradient)"
            stroke="#1F5B42"
            strokeWidth={3}
            type="monotone"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="glass-card h-[340px] p-5">
      <div className="mb-5">
        <p className="subtle-label">{subtitle}</p>
        <h3 className="mt-2 text-xl font-semibold text-primary">{title}</h3>
      </div>
      <div className="h-[250px]">{renderChart()}</div>
    </div>
  );
}
