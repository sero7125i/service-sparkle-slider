import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

const ImpressumButton = () => {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Link to="/impressum">
        <Button 
          variant="secondary" 
          size="sm"
          className="glass-card shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <FileText className="w-4 h-4 mr-2" />
          Impressum
        </Button>
      </Link>
    </div>
  );
};

export default ImpressumButton;