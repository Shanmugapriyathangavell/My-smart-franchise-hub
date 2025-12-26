import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, Download, Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Payments = () => {
  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for trying out WorkFlow.AI",
      features: [
        "Up to 5 projects",
        "Basic AI features",
        "Community support",
        "1GB storage"
      ],
      current: false
    },
    {
      name: "Pro",
      price: "49",
      description: "For growing teams and businesses",
      features: [
        "Unlimited projects",
        "Advanced AI automation",
        "Priority support",
        "50GB storage",
        "Custom integrations",
        "Analytics dashboard"
      ],
      current: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "Custom AI training",
        "Unlimited storage",
        "SLA guarantee",
        "On-premise deployment"
      ],
      current: false
    }
  ];

  const invoices = [
    { id: "INV-001", date: "2025-01-01", amount: "$49.00", status: "paid", plan: "Pro" },
    { id: "INV-002", date: "2024-12-01", amount: "$49.00", status: "paid", plan: "Pro" },
    { id: "INV-003", date: "2024-11-01", amount: "$49.00", status: "paid", plan: "Pro" },
    { id: "INV-004", date: "2024-10-01", amount: "$49.00", status: "paid", plan: "Pro" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Payments & Subscription</h1>
          <p className="text-muted-foreground">Manage your subscription and billing</p>
        </div>

        {/* Current Plan */}
        <GlassCard hover={false} className="bg-gradient-secondary">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current Plan</p>
              <h3 className="text-3xl font-bold">Pro Plan</h3>
              <p className="text-muted-foreground mt-2">
                Next billing date: <span className="font-medium">February 1, 2025</span>
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">Change Plan</Button>
              <Button variant="destructive">Cancel Subscription</Button>
            </div>
          </div>
        </GlassCard>

        {/* Payment Method */}
        <GlassCard hover={false}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Method
            </h3>
            <Button variant="outline" size="sm">Add New</Button>
          </div>
          <div className="p-4 border border-border/50 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-gradient-primary rounded flex items-center justify-center text-primary-foreground font-bold text-xs">
                VISA
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/2026</p>
              </div>
            </div>
            <Badge className="bg-success/20 text-success">Default</Badge>
          </div>
        </GlassCard>

        {/* Pricing Plans */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Available Plans</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <GlassCard
                key={index}
                className={`text-center ${plan.current ? "ring-2 ring-primary" : ""}`}
              >
                {plan.current && (
                  <div className="inline-block px-3 py-1 bg-gradient-primary text-primary-foreground text-sm font-medium rounded-full mb-4">
                    Current Plan
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.price !== "Custom" && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8 text-left">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.current ? "bg-gradient-primary text-primary-foreground" : ""
                  }`}
                  variant={plan.current ? "default" : "outline"}
                  disabled={plan.current}
                >
                  {plan.current ? "Current Plan" : "Upgrade"}
                </Button>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Invoice History */}
        <GlassCard hover={false}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Invoice History
            </h3>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.plan}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>
                      <Badge className="bg-success/20 text-success">
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default Payments;
