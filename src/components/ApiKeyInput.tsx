import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Key, ExternalLink } from "lucide-react";

interface ApiKeyInputProps {
  onApiKeySet: (key: string) => void;
  onClearApiKey?: () => void;
  hasExistingKey?: boolean;
}

export const ApiKeyInput = ({ onApiKeySet, onClearApiKey, hasExistingKey }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState("");
  const [showInput, setShowInput] = useState(!hasExistingKey);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySet(apiKey.trim());
      setShowInput(false);
    }
  };

  const handleClear = () => {
    onClearApiKey?.();
    setApiKey("");
    setShowInput(true);
  };

  if (hasExistingKey && !showInput) {
    return (
      <Card className="bg-gradient-to-br from-card to-card/80 border-border max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Key className="w-5 h-5 text-success" />
              </div>
              <span className="text-sm text-foreground font-medium">API Key Connected</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowInput(true)}>
                Change
              </Button>
              <Button variant="outline" size="sm" onClick={handleClear} className="text-destructive hover:text-destructive">
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-card to-card/80 border-border max-w-md mx-auto animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <div className="p-2 rounded-lg bg-primary/10">
            <Key className="w-5 h-5 text-primary" />
          </div>
          Alpha Vantage API Key
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your Alpha Vantage API key to start tracking stocks.{" "}
          <a
            href="https://www.alphavantage.co/support/#api-key"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline inline-flex items-center gap-1"
          >
            Get a free key <ExternalLink className="w-3 h-3" />
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            className="flex-1 bg-secondary border-border text-foreground"
          />
          <Button 
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={!apiKey.trim()}
          >
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

