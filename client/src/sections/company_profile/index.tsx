import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useStore } from "@nanostores/react";
import { CompanyProfileCubit } from "./cubit";
import _ from "lodash";
import { ThinTopBar } from "@/components/thin_top_bar";
import { useNavigate } from "@tanstack/react-router";
import {l10n} from "@/l10n";

interface CompanyProfile {
  name: string;
  bin: string;
  description: string;
}

export default function CompanyProfileEditor() {
  const nav = useNavigate();
  const state = useStore(CompanyProfileCubit.state);
  const [profile, setProfile] = useState<CompanyProfile>({
    name: "",
    bin: "",
    description: "",
  });

  useEffect(() => {
    setProfile({
      name: state.company_profile.name || "",
      bin: state.company_profile.bin || "",
      description: state.company_profile.description || "",
    });
  }, [state]);

  return (
    <Card className="w-full h-full max-w-2xl mx-auto">
      <ThinTopBar
        title={l10n("Company Profile Editor")}
        actions={
          <Button variant="ghost" size="icon" onClick={() => nav({ to: "/" })}>
            <i className="bx bx-x text-2xl"></i>
          </Button>
        }
      />
      <CardHeader>
        <CardTitle className="hidden">{l10n("Company Profile Editor")}</CardTitle>
        <CardDescription>
          {l10n("Edit your company's profile information, or use AI assistant to fill up the form for you.")}
        </CardDescription>
      </CardHeader>
      <div>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{l10n("Company Name")}</Label>
            <Input
              id="name"
              name="name"
              defaultValue={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder={l10n("Enter company name")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bin">{l10n("Business Identification Number (BIN)")}</Label>
            <Input
              id="bin"
              name="bin"
              defaultValue={profile.bin}
              onChange={(e) => setProfile({ ...profile, bin: e.target.value })}
              placeholder={l10n("Enter 12-digit BIN")}
              maxLength={12}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">{l10n("Company Description")}</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={profile.description}
              onChange={(e) => setProfile({ ...profile, description: e.target.value })}
              placeholder={l10n("Enter company description")}
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={_.isEqual(profile, {
              name: state.company_profile.name,
              bin: state.company_profile.bin,
              description: state.company_profile.description,
            })}
            onClick={async () => {
              CompanyProfileCubit.save_company_profile(profile);
            }}
          >
            {l10n("Save Profile")}
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
